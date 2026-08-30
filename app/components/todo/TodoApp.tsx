
// const items = ['test']
// export function TodoApp() {
//     return (
//         <div className="px-10">
//             <h1>Lista de Tareas</h1>
//             {
//                 items.map((item) => (
//                 <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
//                     <div className="flex">
//                         <div className="shrink-0">
//                         {/* <img
//                             className="h-48 w-full object-cover md:h-full md:w-48"
//                             src="/"
//                             alt="Modern building architecture"
//                         /> */}
//                         </div>
//                         <div className="p-8">
//                         <div className="text-sm font-semibold tracking-wide text-indigo-500 uppercase">{item}</div>
//                         {/* <a href="#" className="mt-1 block text-lg leading-tight font-medium text-black hover:underline">
//                             Incredible accommodation for your team
//                         </a>
//                         <p className="mt-2 text-gray-500">
//                             Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of
//                             places to do just that.
//                         </p> */}
//                         </div>
//                     </div>
//                 </div>
//                 ))
//             }
//         </div>
//     )
// }
"use client";

// import { TodoFilters } from "/components/todo/TodoFilters";
import { TodoForm } from "./TodoForm";
import { TodoList } from "../../components/todo/TodoList";
import { useTodos } from "../hooks/useTodos";

export function TodoApp() {
  const {
    // filteredTodos,
    // filter,
    // remainingCount,
    // completedCount,
    isLoaded,
    addTodo,
    toggleTodo,
    deleteTodo,
    // setFilter,
    clearCompleted,
    getAllTodo,
  } = useTodos();

  if (!isLoaded) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-center text-slate-500">
          Cargando tareas...
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5 sm:p-6">
        <TodoForm onAdd={addTodo} />
      </div>

      {/* <TodoFilters
        currentFilter={filter}
        onFilterChange={setFilter}
      /> */}

      <TodoList
        todos={getAllTodo()}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />

      {/* <footer className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>
          {remainingCount}{" "}
          {remainingCount === 1
            ? "tarea pendiente"
            : "tareas pendientes"}
        </span>

        <button
          type="button"
          onClick={clearCompleted}
          disabled={completedCount === 0}
          className="text-left font-medium text-slate-600 transition hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Limpiar completadas
        </button>
      </footer> */}
    </section>
  );
}