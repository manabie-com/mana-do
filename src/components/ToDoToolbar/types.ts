import { ChangeEvent } from "react";
import { Todo, TodoStatus } from "../../types/types";

export interface ToDoToolbarProps {
    todos: Todo[],
    onSetShowing: (value: TodoStatus) => void,
    onToggleAllTodo: (e: ChangeEvent<HTMLInputElement>) => void,
    onDeleteAllTodo: () => void;
};
