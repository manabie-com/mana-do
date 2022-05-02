import { useEffect, useReducer, useRef, useState, KeyboardEvent, ChangeEvent } from 'react';

import reducer, { initialState } from '../store/reducer';
import {
    setToDos,
    createToDo,
    toggleAllToDos,
    deleteAllToDos,
    updateToDoStatus,
    deleteToDo,
    editToDo
} from '../store/actions';
import Service from '../service';
import { EnhanceTodoStatus, KeyboardKeys } from '../components/types';
import { ToDoCreation, ToDoList, ToDoToolbar } from '../components';
import { ToDoPageContainer } from '../components/styles';
import { TodoStatus } from '../types/types';

const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchTodosOnLoad()
    }, []);

    const fetchTodosOnLoad = async () => {
        const resp = await Service.getTodos();
        dispatch(setToDos(resp || []));
    }

    const onCreateTodo = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === KeyboardKeys.ENTER && inputRef?.current) {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createToDo(resp));
        }
    };

    const onEditTodo = async (e: KeyboardEvent<HTMLInputElement>, todoId: string, todoContent: string ) => dispatch(editToDo(todoId, todoContent));

    const onUpdateTodoStatus = (e: ChangeEvent<HTMLInputElement>, todoId: number) => dispatch(updateToDoStatus(todoId, e.target.checked));

    const onToggleAllTodo = (e: ChangeEvent<HTMLInputElement>) => dispatch(toggleAllToDos(e.target.checked));

    const onDeleteToDo = (toDoId: string) => dispatch(deleteToDo(toDoId));

    const onDeleteAllTodo = () => dispatch(deleteAllToDos());

    const onSetShowing = (todoStatus: TodoStatus) => setShowing(todoStatus);

    return (
        <ToDoPageContainer>
            <ToDoCreation inputRef={inputRef} onCreateTodo={onCreateTodo} />
            <ToDoList todos={todos} showing={showing} onUpdateTodoStatus={onUpdateTodoStatus} onDeleteToDo={onDeleteToDo} onEditTodo={onEditTodo} />
            <ToDoToolbar todos={todos} onSetShowing={onSetShowing} onToggleAllTodo={onToggleAllTodo} onDeleteAllTodo={onDeleteAllTodo} />
        </ToDoPageContainer>
    );
};

export default ToDoPage;