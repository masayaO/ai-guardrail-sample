import { useEffect, useState } from "react";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Input } from "@/ui/input";
import type { Todo } from "@/types/todo";

type EditTodoDialogProps = {
  open: boolean;
  todo: Todo;
  onOpenChange: (open: boolean) => void;
  onSubmit: (title: string) => void;
};

const MAX_TITLE_LENGTH = 100;

export function EditTodoDialog({
  open,
  todo,
  onOpenChange,
  onSubmit,
}: EditTodoDialogProps) {
  const [title, setTitle] = useState(todo.title);

  useEffect(() => {
    setTitle(todo.title);
  }, [todo]);

  function handleSubmit() {
    const normalizedTitle = title.trim();
    if (!normalizedTitle) {
      return;
    }

    onSubmit(normalizedTitle);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ToDoを編集</DialogTitle>
          <DialogDescription>タイトルを更新してください。</DialogDescription>
        </DialogHeader>
        <Input
          value={title}
          maxLength={MAX_TITLE_LENGTH}
          onChange={(event) => setTitle(event.target.value)}
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            キャンセル
          </Button>
          <Button onClick={handleSubmit}>保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
