import { Todo } from "../../models/todo";
export interface TodoItemPropsInterface {
  todo: Todo;
  onDeleteTodo: (id: string) => void;
  onEditTodo: (id: string, content: string) => void;
  onUpdateTodoStatus: (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: any
  ) => void;
}
