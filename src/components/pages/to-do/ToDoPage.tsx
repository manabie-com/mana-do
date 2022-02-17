import { useEffect, useReducer, useState } from "react";

import reducer, { initialState } from "../../../store/reducer";
import { setTodos } from "../../../store/actions";
import Service from "../../../service";
import { TodoStatus } from "../../../models/todo";
import ToolBar from "../../common/tool-bar/ToolBar";
import TaskCreateInput from "../../common/to-do-create-input/ToDoCreateInput";
import ToDoList from "../../common/to-do-list/ToDoList";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login';
    }
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");

    useEffect(() => {
        (async () => {
            const res = await Service.getTodos();
            dispatch(setTodos(res.data || []));
        })();
    }, []);

    const toolBarProps = {
        todos,
        dispatch,
        setShowing,
    };
    const taskCreateInputProps = {
        dispatch,
    };
    const toDoListProps = {
        todos,
        dispatch,
        showing,
    };
    return (
        <div className="to-do__container">
            <div className="to-do__creation">
                <TaskCreateInput {...taskCreateInputProps} />
            </div>
            <div className="to-do__toolbar">
                <ToolBar {...toolBarProps} />
            </div>
            <div className="to-do__list">
                <ToDoList {...toDoListProps} />
            </div>
        </div>
    );
};

export default ToDoPage;
