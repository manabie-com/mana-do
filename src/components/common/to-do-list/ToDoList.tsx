import { FC } from "react";
import { Todo } from "../../../models/todo";
import ToDoItem from "../to-do-item/ToDoItem";
import Image from "../../../asset/images/blank-state.png";

interface ToDoListProps {
    todos: Array<Todo>;
    dispatch: Function;
    showing: string;
}

const ToDoList: FC<ToDoListProps> = ({ todos, dispatch, showing }) => {
    return (
        <>{todos.filter(todo => {
            if (showing === "ALL") {
                return todo;
            }
            return todo.status === showing
        }).map((todo) => {
            const taskRowProps = {
                todo,
                dispatch
            };
            return <ToDoItem key={todo.id} {...taskRowProps} />
        })}
        {!todos.length && <img className="to-do__blank-img" src={Image} alt="no items found!"/>}
        </>
    )
}

export default ToDoList;