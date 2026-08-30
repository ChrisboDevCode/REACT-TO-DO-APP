import type { Todo } from "../../types/todo";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TodoItem({
  todo,
  onToggle,
  onDelete,
}: TodoItemProps) {
    console.log('todo', todo)
  const toggleLabel = todo.completed
    ? `Marcar ${todo.description} como pendiente`
    : `Marcar ${todo.description} como completada`;

  return (
    <li className="flex items-center gap-3 px-5 py-4 sm:px-6">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={toggleLabel}
        className="h-5 w-5 shrink-0 cursor-pointer rounded border-slate-300 accent-blue-600"
      />

      <span
        className={`min-w-0 flex-1 break-words ${
          todo.completed
            ? "text-slate-400 line-through"
            : "text-slate-800"
        }`}
      >
        {todo.description}
      </span>

      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label={`Eliminar ${todo.description}`}
        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-4 focus:ring-red-100"
      >
        Eliminar
      </button>
    </li>
  );
}