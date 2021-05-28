import React, { memo, SetStateAction, useContext } from 'react'
import { TodoContext } from '../contexts/todo'
import { EnhanceTodoStatus, TodoStatus } from '../models/todo'
import { deleteAllTodos, toggleAllTodos } from '../store/actions'
import { isTodoCompleted } from '../utils'
import Service from '../service'

interface TodoToolbarProps {
    onFilterStatus: React.Dispatch<SetStateAction<EnhanceTodoStatus>>
}

const TodoToolbar = (props: TodoToolbarProps) => {
    const { onFilterStatus } = props
    const { store, dispatch } = useContext(TodoContext)

    const onToggleAllTodo = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let newTodoList = store.todos.map(item => {
            item.status = (e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE)
            return item
        })
        dispatch(toggleAllTodos(e.target.checked))
        await Service.updateTodoStatus(newTodoList)
    }

    const onDeleteAllTodo = async () => {
        await Service.clearTodo()
        dispatch(deleteAllTodos())
    }

    const numberOfActiveItem = store.todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1
    }, 0)

    return (
        <div className="Todo__toolbar">
            {store.todos.length > 0 ?
                <input
                    className="Action__cbx--check-all"
                    type="checkbox"
                    checked={!numberOfActiveItem}
                    onChange={onToggleAllTodo}
                /> : <div/>
            }
            <div className="Todo__tabs">
                <button className="Action__btn " onClick={() => onFilterStatus('ALL')}>
                    All
                </button>
                <button className="Action__btn Action__btn--active" onClick={() => onFilterStatus(TodoStatus.ACTIVE)}>
                    Active
                </button>
                <button className="Action__btn Action__btn--completed" onClick={() => onFilterStatus(TodoStatus.COMPLETED)}>
                    Completed
                </button>
            </div>
            <button className="Action__btn Action__btn--clear" onClick={onDeleteAllTodo}>
                Clear all todos
            </button>
        </div>
    )
}

export default memo(TodoToolbar)
