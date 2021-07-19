import React, { useState } from 'react'
import styled from 'styled-components'
import { Todo } from '../../models/todo';
import { isTodoCompleted } from '../../utils';
import Checkbox from '../Checkbox';
import TextField from '../TextField';
import TodoItem from '../TodoItem'



interface IProps {
    todos: Todo[],
    onUpdateTodoContent : (todoId: string, todoContent: string) => void,
    onUpdateTodoStatus : (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => void,
    onDeleteTodo: (todoId: string) => void,
}

const TodoList = ({todos, onUpdateTodoContent, onUpdateTodoStatus,  onDeleteTodo, ...props } : IProps) => {
    

    return (
        <div className="ToDo__list" data-testid="todo-list">
                {
                    todos.map((todo, index) => {
                        return (
                            <TodoItem 
                                key={index}
                                todo={todo}
                                onDeleteTodo={onDeleteTodo}
                                onUpdateTodoContent={onUpdateTodoContent}
                                onUpdateTodoStatus={onUpdateTodoStatus}
                            />
                        );
                    })
                }
            </div>
    )
}

export default TodoList