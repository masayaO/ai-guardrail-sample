import { create } from "zustand";
import { loadTodos, saveTodos } from "@/lib/storage";
import type { Filter, Todo } from "@/types/todo";

type TodoState = {
  todos: Todo[];
  filter: Filter;
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (id: string, title: string) => void;
  removeTodo: (id: string) => void;
  setFilter: (filter: Filter) => void;
  clearCompleted: () => void;
};

const MAX_TITLE_LENGTH = 100;

function normalizeTitle(title: string) {
  return title.trim().slice(0, MAX_TITLE_LENGTH);
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: loadTodos(),
  filter: "all",
  addTodo: (title) => {
    const normalizedTitle = normalizeTitle(title);
    if (!normalizedTitle) {
      return;
    }

    set((state) => {
      const now = new Date().toISOString();
      const nextTodos: Todo[] = [
        {
          id: crypto.randomUUID(),
          title: normalizedTitle,
          completed: false,
          createdAt: now,
          updatedAt: now,
        },
        ...state.todos,
      ];
      saveTodos(nextTodos);
      return { todos: nextTodos };
    });
  },
  toggleTodo: (id) => {
    set((state) => {
      const nextTodos = state.todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              updatedAt: new Date().toISOString(),
            }
          : todo,
      );
      saveTodos(nextTodos);
      return { todos: nextTodos };
    });
  },
  updateTodo: (id, title) => {
    const normalizedTitle = normalizeTitle(title);
    if (!normalizedTitle) {
      return;
    }

    set((state) => {
      const nextTodos = state.todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title: normalizedTitle,
              updatedAt: new Date().toISOString(),
            }
          : todo,
      );
      saveTodos(nextTodos);
      return { todos: nextTodos };
    });
  },
  removeTodo: (id) => {
    set((state) => {
      const nextTodos = state.todos.filter((todo) => todo.id !== id);
      saveTodos(nextTodos);
      return { todos: nextTodos };
    });
  },
  setFilter: (filter) => set({ filter }),
  clearCompleted: () => {
    set((state) => {
      const nextTodos = state.todos.filter((todo) => !todo.completed);
      saveTodos(nextTodos);
      return { todos: nextTodos };
    });
  },
}));
