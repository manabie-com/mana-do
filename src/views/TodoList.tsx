import React from 'react'
import { EnhanceTodoStatus, Todo, TodoStatus } from '../models/todo';
import { AppActions, deleteTodo, updateTodoStatus } from '../store/actions';
import { isTodoCompleted } from '../utils';
import deleteIcon from '../assets/delete-icon.png'

interface TodoListInteface {
    todos: Todo[]
    showing: EnhanceTodoStatus
    inputRef: React.RefObject<HTMLInputElement>
    setTodoEditingId: (id: string) => void
    onChangeTodos: (action: AppActions) => void
}

const TodoList = ({ todos, showing, inputRef, onChangeTodos, setTodoEditingId }: TodoListInteface) => {
    // after users clicked on the todo, I set todo's content into input field
    const onDoubleClickOnTodo = (todo: any) => {
        if (inputRef.current) {
            inputRef.current.value = todo.content
            setTodoEditingId(todo.id)
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        onChangeTodos(updateTodoStatus(todoId, e.target.checked))
    }

    const showTodos = todos.filter((todo) => {
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
        <div className="ToDo__list">
            {
                showTodos.map((todo, index) => {
                    return (
                        <div key={index} className="ToDo__item">
                            <input
                                type="checkbox"
                                checked={isTodoCompleted(todo)}
                                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                            />
                            <span className="ToDo__content" onDoubleClick={() => onDoubleClickOnTodo(todo)}>{todo.content}</span>
                            <div className='Todo_delete' onClick={() => onChangeTodos(deleteTodo(todo.id))}>
                                <img src={deleteIcon} alt="#" />
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default TodoList