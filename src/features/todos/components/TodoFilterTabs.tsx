import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs";
import type { Filter, Todo } from "@/types/todo";

type TodoFilterTabsProps = {
  filter: Filter;
  todos: Todo[];
  onChangeFilter: (filter: Filter) => void;
};

export function TodoFilterTabs({
  filter,
  todos,
  onChangeFilter,
}: TodoFilterTabsProps) {
  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <Tabs
      value={filter}
      onValueChange={(value) => onChangeFilter(value as Filter)}
    >
      <TabsList>
        <TabsTrigger value="all">すべて ({todos.length})</TabsTrigger>
        <TabsTrigger value="active">未完了 ({activeCount})</TabsTrigger>
        <TabsTrigger value="completed">完了 ({completedCount})</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
