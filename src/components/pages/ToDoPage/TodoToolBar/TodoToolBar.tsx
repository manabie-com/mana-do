import React from 'react';
import { Todo, TodoStatus } from '../../../../models/todo';
import { AppActions, deleteAllTodos, toggleAllTodos } from '../../../../store/actions';
import { isTodoCompleted } from '../../../../utils';
import Button from '../../../atom/Button/Button';
import ColoredButton from '../../../atom/ColoredButton/ColoredButton';

import './todoToolBar.scss'
import FormInput from '../../../atom/FormInput/FormInput';
import { EnhanceTodoStatus } from '../ToDoPage/ToDoPage';
import { BackgroundColor } from '../TodoItem/TodoItem';

interface IToolBar {
    todos: Todo[],
    dispatch: React.Dispatch<AppActions>,
    setShowing: React.Dispatch<React.SetStateAction<EnhanceTodoStatus>>,
}

const listButton = [
    {
        label: 'All',
        show: "ALL" as EnhanceTodoStatus,
        backgroundColor: "white"
    },
    {
        label: 'Active',
        show: TodoStatus.ACTIVE as EnhanceTodoStatus,
        backgroundColor: BackgroundColor.isActive

    },
    {
        label: 'Completed',
        show: TodoStatus.COMPLETED as EnhanceTodoStatus,
        backgroundColor: BackgroundColor.isCompleted

    }
]

const TodoToolBar = ({ todos, dispatch, setShowing }: IToolBar) => {
    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    const onDeleteAllTodos = () => {
        dispatch(deleteAllTodos())
        localStorage.removeItem('task')
    }

    return (
        <div className="Todo__toolbar">
            {todos.length > 0 &&
                <FormInput
                    className='Todo__toolbar-checkbox'
                    type="checkbox"
                    onChange={(e) => dispatch(toggleAllTodos(e.target.checked))}
                    checked={activeTodos === 0} />
            }
            <div className="Todo__tabs">
                {listButton.map((button, index) => {
                    return (
                        <ColoredButton
                            key={index}
                            backgroundColor={button.backgroundColor}
                            label={button.label}
                            setShowing={setShowing}
                            showing={button.show} />
                    )
                })}
            </div>
            <Button label='Clear all todos' className="btn-clearAll" onClick={onDeleteAllTodos} />
        </div>
    )
}

export default TodoToolBar;