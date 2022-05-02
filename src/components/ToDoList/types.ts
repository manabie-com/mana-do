import { KeyboardEvent } from 'react';
import { ChangeEvent } from "react";
import { Todo } from "../../types/types";
import { EnhanceTodoStatus } from "../types";

export interface ToDoListProps {
    todos: Todo[];
    showing: EnhanceTodoStatus;
    onUpdateTodoStatus: (e: ChangeEvent<HTMLInputElement>, todoId: number) => void;
    onDeleteToDo: (toDoId: string) => void;
    onEditTodo: (e: KeyboardEvent<HTMLInputElement>, todoId: string, todoContent: string) => void;
};
