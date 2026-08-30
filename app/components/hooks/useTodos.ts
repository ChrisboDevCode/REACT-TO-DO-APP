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
  const [newTodo, setNewTodo] = useState<Todo>();
//   const [filter, setFilter] =
//     useState<TodoStatus>("all");
  const [isLoaded, setIsLoaded] = useState(false);

//   Llama una vez para obtener todos los todos al inicio
  useEffect(() => {
    try {
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

// //   Llama cada vez que se agrega un TO-DO 
//     useEffect( () => {
//         try{
//             if(newTodo && newTodo.description){
//                 fetch('https://dummyjson.com/todos/add', {
//                     body: JSON.stringify({
//                       todo: newTodo.description,
//                       completed: newTodo.completed,
//                       userId: 5,
//                     })
//                   })
//                   .then(res => res.json())
//                   .then((respTodo) => newTodo.id = respTodo.id);
//             }
//         }catch(error){

//         }
//     }, [newTodo]);

//   useEffect(() => {
//     if (!isLoaded) {
//       return;
//     }

//     try {
//       window.localStorage.setItem(
//         STORAGE_KEY,
//         JSON.stringify(todos),
//       );
//     } catch (error) {
//       console.error(
//         "No fue posible guardar las tareas:",
//         error,
//       );
//     }
//   }, [todos, isLoaded]);

//   const filteredTodos = useMemo(() => {
//     if (filter === "active") {
//       return todos.filter(
//         (todo) => !todo.completed,
//       );
//     }

//     if (filter === "completed") {
//       return todos.filter(
//         (todo) => todo.completed,
//       );
//     }

//     return todos;
//   }, [todos, filter]);

//   const remainingCount = useMemo(() => {
//     return todos.filter(
//       (todo) => !todo.completed,
//     ).length;
//   }, [todos]);

//   const completedCount = useMemo(() => {
//     return todos.filter(
//       (todo) => todo.completed,
//     ).length;
//   }, [todos]);

  function getAllTodo(){
    return todos;
  }
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
    };
                fetch('https://dummyjson.com/todos/add', {
                            method: 'POST',
                            body: JSON.stringify({
                              todo: newTodo.description,
                              completed: newTodo.completed,
                              userId: 5,
                            })
                          })
                          .then(res => res.json())
                          .then((respTodo) => newTodo.id = respTodo.id);
    setNewTodo(newTodo);
    setTodos((currentTodos) => [
      newTodo,
      ...currentTodos,
    ]);
  }

  function toggleTodo(id: string) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>{
        if (todo.id === id){
            todo.completed = !todo.completed
        }
            /* updating completed status of todo with id 1 */
            fetch(`https://dummyjson.com/todos/${id}`, {
                method: 'PUT', /* or PATCH */
                body: JSON.stringify({
                completed: todo.completed,
                })
            })
            .then(res => res.json())
            .then(console.log);
        return todo;
        // return todo.id === id ? {...todo, completed: !todo.completed} : todo
    }
     ),
    );
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
    getAllTodo,
  };
}