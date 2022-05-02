import { RefObject, KeyboardEvent } from "react";

export interface ToDoCreationProps {
    inputRef: RefObject<HTMLInputElement>,
    onCreateTodo: (e: KeyboardEvent<HTMLInputElement>) => void;
}