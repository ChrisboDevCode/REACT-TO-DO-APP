import { TodoItem } from "../../components/todo/TodoItem";
import type { Todo } from "../../types/todo";

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TodoList({
  todos,
  onToggle,
  onDelete,
}: TodoListProps) {
  if ( todos.length === 0) {
    return (
      <div className="px-6 py-14 text-center">
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-2xl"
          aria-hidden="true"
        >
          ✓
        </div>

        <p className="font-medium text-slate-700">
          No hay tareas en esta vista.
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Agrega una tarea o cambia el filtro.
        </p>
      </div>
    );
  }

  return (
    <ul
      className="divide-y divide-slate-100"
      aria-label="Lista de tareas"
    >
      {
      todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}