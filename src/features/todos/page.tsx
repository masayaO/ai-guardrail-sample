import { useMemo } from 'react'
import { TodoFilterTabs } from '@/features/todos/components/TodoFilterTabs'
import { TodoInput } from '@/features/todos/components/TodoInput'
import { TodoList } from '@/features/todos/components/TodoList'
import { Button } from '@/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { useTodoStore } from '@/store/todoStore'

export function TodosPage() {
  const { todos, filter, addTodo, toggleTodo, updateTodo, removeTodo, setFilter, clearCompleted } = useTodoStore()

  const filteredTodos = useMemo(() => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.completed)
    }
    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed)
    }
    return todos
  }, [todos, filter])

  const hasCompleted = todos.some((todo) => todo.completed)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">ToDo サンプル</CardTitle>
        <CardDescription>React + Vite + TanStack Router + Tailwind + Zustand</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <TodoInput onAddTodo={addTodo} />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <TodoFilterTabs filter={filter} todos={todos} onChangeFilter={setFilter} />
          <Button variant="outline" onClick={clearCompleted} disabled={!hasCompleted}>
            完了済みを一括削除
          </Button>
        </div>
        <TodoList todos={filteredTodos} onToggle={toggleTodo} onUpdate={updateTodo} onDelete={removeTodo} />
      </CardContent>
    </Card>
  )
}
