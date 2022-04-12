import './index.scss';
import React from 'react';
import { Todo } from '../../models/todo';
import TodoItem from '../TodoItem';

export default function (props: any) {
    const {
        todoListDisplay,
        showing,
        editing,
        onUpdateTodoStatus,
        handleOnChangeData,
        handleEditTodo,
        handleDeleteTodo,
        onSaveEdit,
        editRef,
        editIndex
    } = props;
    return (
        <div className="ToDo__list">
            {todoListDisplay.map((todo: Todo, index: number) => {
                return (showing === 'ALL' || showing === todo.status) && (
                    <TodoItem
                        todo={todo}
                        editing={editing}
                        index={index}
                        onUpdateTodoStatus={onUpdateTodoStatus}
                        handleOnChangeData={handleOnChangeData}
                        handleEditTodo={handleEditTodo}
                        handleDeleteTodo={handleDeleteTodo}
                        onSaveEdit={onSaveEdit}
                        editRef={editRef}
                        editIndex={editIndex}
                        showing={showing}
                    />
                );
            })}
        </div>
    )
}