"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useState,
} from "react";

type TodoFormProps = {
  onAdd: (title: string) => void;
};

export function TodoForm({
  onAdd,
}: TodoFormProps) {
  const [title, setTitle] = useState("");

  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    setTitle(event.target.value);
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const cleanTitle = title.trim();

    if (!cleanTitle) {
      return;
    }

    onAdd(cleanTitle);
    setTitle("");
  }

  const isEmpty = title.trim().length === 0;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <label
        htmlFor="new-todo"
        className="sr-only"
      >
        Nueva tarea
      </label>

      <input
        id="new-todo"
        type="text"
        value={title}
        onChange={handleChange}
        placeholder="Ejemplo: terminar el README"
        maxLength={120}
        autoComplete="off"
        className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />

      <button
        type="submit"
        disabled={isEmpty}
        className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Agregar
      </button>
    </form>
  );
}