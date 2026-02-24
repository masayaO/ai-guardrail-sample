import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'

type TodoInputProps = {
  onAddTodo: (title: string) => void
}

const MAX_TITLE_LENGTH = 100

export function TodoInput({ onAddTodo }: TodoInputProps) {
  const [title, setTitle] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalizedTitle = title.trim()
    if (!normalizedTitle) {
      return
    }

    onAddTodo(normalizedTitle)
    setTitle('')
  }

  return (
    <form className="flex w-full gap-2" onSubmit={handleSubmit}>
      <Input
        value={title}
        maxLength={MAX_TITLE_LENGTH}
        placeholder="やることを入力"
        onChange={(event) => setTitle(event.target.value)}
      />
      <Button type="submit">追加</Button>
    </form>
  )
}
