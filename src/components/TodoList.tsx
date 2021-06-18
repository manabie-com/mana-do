import React, {useCallback} from 'react';
import {isTodoCompleted} from "../utils";
import {deleteTodo} from "../store/actions";
import {Todo} from "../models/todo";

type TodoListProps = {
    todos: Todo[];
    updateItem: (...params: any) => any
    deleteItem: (params: any) => any
}
type TodoItemProps = {
    todo: Todo
    onClick: (params: any) => any
    onChange: (params: any) => any
}
export const TodoItem = (props: TodoItemProps) => {
    const {todo, onClick, onChange} = props;
    return <div className="ToDo__item">
        <input
            type="checkbox"
            checked={isTodoCompleted(todo)}
            onChange={onChange}
        />
        <span>{todo.content}</span>
        <button
            className="Todo__delete"
            onClick={onClick}
        >
            X
        </button>
    </div>
}
export const TodoList = (props: TodoListProps) => {
    const {todos = [], updateItem, deleteItem} = props;
    const onUpdateItem = (todoId: string) => (e: React.ChangeEvent<HTMLInputElement>) => updateItem(e, todoId)
    const onDeleteItem = (todoId: string) => () => deleteItem(todoId)
    return <div className="ToDo__list">
        {
            todos.map((todo, index) => {
                const _onChange = onUpdateItem(todo.id)
                const _onClick = onDeleteItem(todo.id)
                return <TodoItem key={index} todo={todo} onChange={_onChange} onClick={_onClick}/>
            })
        }
    </div>
}