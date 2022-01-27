import { FC } from "react";
import { Todo } from "../../../models/todo";
import ToDoItem from "../to-do-item/ToDoItem";

interface ToDoListProps {
    todos: Array<Todo>;
    onUpdateTodoStatus: Function;
    onDeleteTodo: Function;
    showing: string;
}

const ToDoList: FC<ToDoListProps> = ({ todos, onUpdateTodoStatus, onDeleteTodo, showing }) => {
    return (
        <>{todos.filter(todo => {
            if (showing === "ALL") {
                return todo;
            }
            return todo.status === showing
        }).map((todo) => {
            const taskRowProps = {
                todo,
                onUpdateTodoStatus,
                onDeleteTodo
            };
            return <ToDoItem key={todo.id} {...taskRowProps} />
        })}
        </>
    )
}

export default ToDoList;