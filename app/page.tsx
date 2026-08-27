import { TodoApp } from "./components/todo/TodoApp";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-12 sm:px-6">
      <header className="mb-8 text-center">
        <div className="bg-gray-800 rounded-xl border-white p-4">
          <p className="mb-2 text-6xl font-semibold font-sans uppercase tracking-widest text-sky-600">
             TO-DO APP
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            <p className="text-white">Mis tareas</p>
          </h1>
          <p className="mt-3 text-gray-300">
            Agrega, completa, filtra y elimina tus tareas pendientes.
          </p>
        </div>
      </header>
      <TodoApp />
    </main>
  );
}