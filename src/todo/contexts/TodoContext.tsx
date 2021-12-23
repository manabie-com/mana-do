import { createContext} from "react";
import { TodoStatus } from "../../models/todo";
import { TodoState } from "../../store/reducer";

export type TodoContextFc = {
    todoList: TodoState,
    showingStatus: TodoStatus | string,
    onUpdateTodoStatus: (e: boolean, todoId: string) => void,
    onDeleteTodo: (id: string) => void,
    onCreateTodo: (content: string) => void,
    onSetShowingTodo: (status: TodoStatus | 'ALL') => void,
    onToggleAllTodos: (status: boolean) => void,
    onDeleteAllTodos: () => void

}

export const TodoContext = createContext<TodoContextFc>(
        {} as TodoContextFc
    )