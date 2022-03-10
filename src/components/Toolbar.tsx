import React, { useContext, useState } from "react"
import { EnhanceTodoStatus, ExtendedTodoFilter } from "../models/filter";
import { TodoStatus } from "../models/todo";
import { deleteAllTodos, toggleAllTodos } from "../store/actions";
import { TodoContext } from "../store/context";

export function ToolBar() {
    const { state, dispatch } = useContext(TodoContext);
    const [showing, setShowing] = useState<EnhanceTodoStatus>(ExtendedTodoFilter.ALL);

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }
    
    return (
        <div className="Todo__toolbar">
            {state.todos.length > 0 && // use Logical AND instead of conditional (ternary) operator
                <input
                    type="checkbox"
                    onChange={onToggleAllTodo}
                />
            }
            <div className="Todo__tabs">
                <button className="Action__btn" onClick={() => setShowing(ExtendedTodoFilter.ALL)}>
                    All
                </button>
                <button className="Action__btn" onClick={() => setShowing(TodoStatus.ACTIVE)}>
                    Active
                </button>
                <button className="Action__btn" onClick={() => setShowing(TodoStatus.COMPLETED)}>
                    Completed
                </button>
            </div>
            <button className="Action__btn" onClick={onDeleteAllTodo}>
                Clear all
            </button>
        </div>
    );
}