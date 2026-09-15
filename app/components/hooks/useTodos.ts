"use client";

import {
  useEffect,
  useState,
} from "react";

import type {
  Todo,
} from "../../types/todo";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadTodos() {
      try {
        const response = await fetch("https://dummyjson.com/todos");
        const data = await response.json();
        const newTodoList: Todo[] = data.todos.map((todo: any) => ({
          id: todo.id,
          description: todo.todo,
          completed: todo.completed,
          userId: todo.userId,
        }));
        setTodos(newTodoList);
      } catch (error) {
        console.error(
          "No fue posible recuperar las tareas:",
          error,
        );
      } finally {
        setIsLoaded(true);
      }
    }

    void loadTodos();
  }, []);

  async function addTodo(title: string) {
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      return;
    }

    try {
      const response = await fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: cleanTitle,
          completed: false,
          userId: 6,
        }),
      });
      const respTodo = await response.json();

      const newTodo: Todo = {
        id: respTodo.id,
        description: cleanTitle,
        completed: false,
        createdAt: new Date().toISOString(),
        userId: 6,
      };

      setTodos((currentTodos) => [newTodo, ...currentTodos]);
    } catch (error) {
      console.error("No fue posible agregar la tarea:", error);
    }
  }

  async function toggleTodo(id: string) {
    const currentTodo = todos.find((todo) => todo.id === id);
    if (!currentTodo) {
      return;
    }

    const nextCompleted = !currentTodo.completed;

    try {
      await fetch(`https://dummyjson.com/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completed: nextCompleted,
        }),
      });

      setTodos((currentTodos) =>
        currentTodos.map((todo) =>
          todo.id === id
            ? { ...todo, completed: nextCompleted }
            : todo,
        ),
      );
    } catch (error) {
      console.error("No fue posible actualizar la tarea:", error);
    }
  }

  async function deleteTodo(id: string) {
    try {
      await fetch(`https://dummyjson.com/todos/${id}`, {
        method: "DELETE",
      });

      setTodos((currentTodos) =>
        currentTodos.filter((todo) => todo.id !== id),
      );
    } catch (error) {
      console.error("No fue posible eliminar la tarea:", error);
    }
  }

  function clearCompleted() {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => !todo.completed),
    );
  }

  return {
    todos,
    isLoaded,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
  };
}
