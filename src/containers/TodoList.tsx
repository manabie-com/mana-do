import React, { useContext } from 'react'
import { TodoContext } from '../contexts/todo'
import { deleteTodo, updateTodo } from '../store/actions'
import { getTodoItemsByStatus, isTodoCompleted } from '../utils'
import InlineEditable from '../components/InlineEditable'
import { Todo, TodoStatus } from '../models/todo'
import Service from '../service'

interface TodoListProps {
    status: string
}

const TodoList = (props: TodoListProps) => {
    const { store, dispatch } = useContext(TodoContext)
    const renderItems = getTodoItemsByStatus(props.status, store.todos)

    const onItemCheck = (todo: Todo) => async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTodo = {
            ...todo,
            status: e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        } as Todo
        await Service.updateTodoStatus([newTodo])
        dispatch(updateTodo(newTodo))
    }

    const onEditItemName = (todo: Todo) => async (content: string) => {
        const newItem = { ...todo, content }
        await Service.updateTodoItemContent(newItem)
        dispatch(updateTodo(newItem))
    }

    const onDeleteTodoItem = (todo: Todo) => async () => {
        await Service.deleteTodoItem(todo.id)
        dispatch(deleteTodo(todo.id))
    }

    return (
        <div className="ToDo__list">
            {
                renderItems.map(
                    todoItem =>
                        <div key={todoItem.id} className="ToDo__item">
                            <input
                                type="checkbox"
                                className="Todo__cbx"
                                checked={isTodoCompleted(todoItem)}
                                onChange={onItemCheck(todoItem)}
                            />
                            <InlineEditable todoName={todoItem.content} onChange={onEditItemName(todoItem)}/>
                            <button
                                className="Todo__delete"
                                onClick={onDeleteTodoItem(todoItem)}
                            >
                                X
                            </button>
                        </div>
                )
            }
        </div>
    )
}

export default TodoList
