"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  Todo,
  TodoStatus,
} from "../../types/todo";

const STORAGE_KEY = "portfolio-todo-app";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
//   const [filter, setFilter] =
//     useState<TodoStatus>("all");
  const [isLoaded, setIsLoaded] = useState(false);

//   Llama una vez para obtener todos los todos al inicio
  useEffect(() => {
    try {
      console.log('otra vez, todo?')
     fetch('https://dummyjson.com/todos')
      .then(res => res.json())
      .then((data) => {
        const newTodoList=  data.todos.map( (todo: any) => {
            const newTodo: Todo= {
                id: todo.id,
                description: todo.todo,
                completed: todo.completed,
                userId: todo.userId,
            }
            return newTodo;
                
        })
        setTodos(newTodoList);
      });

    } catch (error) {
      console.error(
        "No fue posible recuperar las tareas:",
        error,
      );
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // function getAllTodo(){
  //   console.log('se repite?')
  //   return todos;
  // }
  function addTodo(title: string) {
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      return;
    }

    const newTodo: Todo = {
      id: '0',
      description: cleanTitle,
      completed: false,
      createdAt: new Date().toISOString(),
      userId: 6
    };
      fetch('https://dummyjson.com/todos/add', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    todo: newTodo.description,
                    completed: newTodo.completed,
                    userId: 6,
                  })
                })
                .then(res => res.json())
                .then((respTodo) => newTodo.id = respTodo.id);
    setTodos((currentTodos) => [
      newTodo,
      ...currentTodos,
    ]);
  }

  function toggleTodo(id: string) {
    const currentTodos = todos.map( (todo) => {
        if (todo.id === id){
          todo.completed = !todo.completed
          fetch(`https://dummyjson.com/todos/${id}`, {
              method: 'PUT', /* or PATCH */
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
              completed: todo.completed,
              })
          })
          .then(res => res.json())
          .then(console.log);
        }
        return todo;

    })
    if (currentTodos.length > 0 ){
      setTodos(currentTodos);
    }
  }

  function deleteTodo(id: string) { 
    fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'DELETE',
      })
      .then(res => res.json())
      .then(console.log);

    setTodos((currentTodos) =>
      currentTodos.filter(
        (todo) => todo.id !== id,
      ),
    );
  }

  function clearCompleted() {
    setTodos((currentTodos) =>
      currentTodos.filter(
        (todo) => !todo.completed,
      ),
    );
  }

  return {
    todos,
    // filteredTodos,
    // filter,
    // remainingCount,
    // completedCount,
    isLoaded,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    // setFilter,
  };
}