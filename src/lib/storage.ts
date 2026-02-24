import type { Todo } from "@/types/todo";

const TODO_STORAGE_KEY = "todo-app-v1";

function isTodo(value: unknown): value is Todo {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const todo = value as Record<string, unknown>;
  return (
    typeof todo.id === "string" &&
    typeof todo.title === "string" &&
    typeof todo.completed === "boolean" &&
    typeof todo.createdAt === "string" &&
    typeof todo.updatedAt === "string"
  );
}

export function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(TODO_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isTodo);
  } catch {
    return [];
  }
}

export function saveTodos(todos: Todo[]) {
  try {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
  } catch {
    // Ignore storage write errors to keep app usable.
  }
}
