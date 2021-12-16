import React from 'react'
import { Todo, TodoStatus } from '../models/todo';
import { AppActions, deleteAllTodos, toggleAllTodos } from '../store/actions';
import { isTodoCompleted } from '../utils';
import Button from './Button';

const BUTTON_CLASS = 'Action__btn'

interface TodoToolbarInterface {
    todos: Todo[]
    onChangeTodos: (action: AppActions) => void
    setShowing: (input: any) => void
}

const TodoToolbar = ({ todos, onChangeTodos, setShowing }: TodoToolbarInterface) => {
    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeTodos(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        onChangeTodos(deleteAllTodos());
    }

    return (
        <div className="Todo__toolbar">
        {todos.length > 0 ?
            <input
                type="checkbox"
                checked={activeTodos === 0}
                onChange={onToggleAllTodo}
            /> : <div/>
        }
        <div className="Todo__tabs">
            <Button attr="all" className={BUTTON_CLASS} label={'All'} onClick={()=>setShowing('ALL')} />
            <Button attr="active" className={BUTTON_CLASS} label={'Active'} onClick={()=>setShowing(TodoStatus.ACTIVE)} />
            <Button attr="completed" className={BUTTON_CLASS} label={'Completed'} onClick={()=>setShowing(TodoStatus.COMPLETED)} />
        </div>
        <Button attr="clear-all" className={BUTTON_CLASS} label={'Clear all todos'} onClick={onDeleteAllTodo} />
    </div>
    )
}

export default TodoToolbar