import './index.scss';
import React from 'react';
import { TodoStatus } from '../../models/todo';

export default function TodoItem(props: any) {
    const {
        todo,
        editing,
        index,
        onUpdateTodoStatus,
        handleOnChangeData,
        handleEditTodo,
        handleDeleteTodo,
        onSaveEdit,
        editRef,
        editIndex,
        showing
    } = props;

    const showingOpacity = showing === 'ALL' && todo.status === TodoStatus.COMPLETED;

    return (
        <div key={index} className="ToDo__item">
            <input
                type="checkbox"
                checked={!!(todo.status === TodoStatus.COMPLETED)}
                onChange={(e) => onUpdateTodoStatus(e, index)}
                className={showingOpacity ? 'completed' : 'active'}
            />
            {editing && index === editIndex
                ? <input
                    ref={editRef}
                    className={'editTodo'}
                    onChange={(e) => handleOnChangeData(e)}
                    onKeyDown={onSaveEdit}
                    value={todo.content}
                />
                : <span
                    className={showingOpacity ? 'completed' : 'active'}
                    onDoubleClick={() => handleEditTodo(index)
                    }>{todo.content}</span>
            }
            <button
                className="Todo__delete"
                onClick={(e) => { handleDeleteTodo(index) }}
            >
                X
            </button>
        </div>
    )
}