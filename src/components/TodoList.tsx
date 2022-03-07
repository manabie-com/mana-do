import React, {Dispatch, SetStateAction} from "react";
import {AppActions,} from "store/actions";
import {Todo, TodoStatus} from "models/todo";
import TodoItem from "./TodoItem";

type EnhanceTodoStatus = TodoStatus | 'ALL';

interface ToolBarProps {
    dispatch: Dispatch<AppActions>,
    todos: Array<Todo>,
    showing: EnhanceTodoStatus,
    setShowing: Dispatch<SetStateAction<EnhanceTodoStatus>>
}

const TodoList: React.FC<ToolBarProps> = ({dispatch, todos, showing, setShowing}) => {
    const todosFilter = todos.filter((todo) => {
        switch (showing) {
            case TodoStatus.ACTIVE:
                return todo.status === TodoStatus.ACTIVE;
            case TodoStatus.COMPLETED:
                return todo.status === TodoStatus.COMPLETED;
            default:
                return true;
        }
    });

    return (
        <div className="Todo__list">
            {todosFilter.map((todo, index) => {
                const todoItemProps = {dispatch, todo}
                return <TodoItem key={todo.id} {...todoItemProps} />;
            })}
            {todos.length > 0 && !(todosFilter.length > 0) &&
            <div className="__no-todos">{"no " + (showing === TodoStatus.ACTIVE ? 'active' : 'completed') + " todos..."}</div>}
        </div>
    );
};

export default TodoList;
