import React, { useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import { CREATE_TODO, GET_TODOS, DELETE_TODO, UPDATE_STATUS_TODO, UPDATE_STATUS_TO_COMPLETED, UPDATE_STATUS_TO_ACTIVE, DELETE_ALL_TODOS } from 'src/redux/reducers/todo'
import { ReducerType, Todo, TodoStatus } from 'src/redux/types'
import { TodoProps } from 'src/types'
import { useForm, Controller } from "react-hook-form"
import moment from "moment"

const ToDoPage = React.memo((props: TodoProps) => {
    const { todos, dispatch } = props,
        { handleSubmit, control, setValue } = useForm(),
        todosActive = todos.filter((t: Todo) => t.status === TodoStatus.ACTIVE),
        todosCompleted = todos.filter((t: Todo) => t.status === TodoStatus.COMPLETED)

    const getTodos = useCallback(() => {
        dispatch({
            type: GET_TODOS
        })
    }, [dispatch])

    const onSubmit = async (data: Partial<Todo>) => {
        dispatch({
            type: CREATE_TODO,
            data
        })
        setValue('content', "")
    }

    const onDeleteTodo = (i: string) => {
        dispatch({
            type: DELETE_TODO,
            data: i
        })
    }

    const onDeleteAll = () => {
        dispatch({
            type: DELETE_ALL_TODOS
        })
    }

    const onChangeStatus = (id: string, status: TodoStatus | undefined) => {
        dispatch({
            type: UPDATE_STATUS_TODO,
            data: id,
            status
        })
    }

    const onToggle = (type: string) => () => {
        if (type === "Completed") {
            dispatch({
                type: UPDATE_STATUS_TO_COMPLETED
            })
        } else if (type === "Active") {
            dispatch({
                type: UPDATE_STATUS_TO_ACTIVE
            })
        }
    }

    useEffect(() => {
        getTodos()
    }, [getTodos])

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="input-sizer">
                    <Controller
                        name="content"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true
                        }}
                        render={({ field }) => (
                            <input
                                {...field}
                                placeholder="Input new todo"
                            />
                        )}
                    />
                    <button type="submit">ADD</button>
                </label>
            </form>
            {todosCompleted.length > 0 && (
                <div>
                    <h4>Completed</h4>
                    {todosCompleted.map((t: Todo) => (
                        <div key={t.id} className="Todo__container">
                            <div className="Todo__information">
                                <p className="Todo__content">{t.content}</p>
                                <p className="Todo_created_date">{moment(t.created_date).format('DD-MM-YYYY HH:mm')}</p>
                            </div>
                            <div>
                                <div className="tooltip">
                                    <input
                                        type="checkbox"
                                        defaultChecked={Boolean(t.status === TodoStatus.COMPLETED)}
                                        onChange={() => onChangeStatus(t.id, t.status)}
                                        className="switch"
                                    />
                                    <span className="tooltiptext">Completed</span>
                                </div>
                                <button onClick={() => onDeleteTodo(t.id)}>Del</button>
                            </div>
                        </div>
                    ))}
                    <hr style={{ width: 350 }} />
                </div>
            )}

            {todosActive.length > 0 && (
                <div>
                    <h4>Active</h4>
                    {todosActive.map((t: Todo) => (
                        <div key={t.id} className="Todo__container">
                            <div className="Todo__information">
                                <p className="Todo__content">{t.content}</p>
                                <p className="Todo_created_date">{moment(t.created_date).format('DD-MM-YYYY HH:mm')}</p>
                            </div>
                            <div>
                                <div className="tooltip">
                                    <input
                                        type="checkbox"
                                        defaultChecked={Boolean(t.status === TodoStatus.COMPLETED)}
                                        onChange={() => onChangeStatus(t.id, t.status)}
                                        className="switch"
                                    />
                                    <span className="tooltiptext">Active</span>
                                </div>
                                <button onClick={() => onDeleteTodo(t.id)}>Del</button>
                            </div>
                        </div>
                    ))}
                    <hr style={{ width: 350 }} />
                </div>
            )}

            <div>
                <h4>Action</h4>
                <div className="Todo__actions">
                    <button onClick={onToggle("Completed")}>Toggle All Status to Completed</button>
                    <button onClick={onToggle("Active")}>Toggle All Status to Active</button>
                    <button onClick={onDeleteAll}>Delete All</button>
                </div>
                <button onClick={() => getTodos()}>Refresh Todos</button>
                <hr style={{ width: 350 }} />
            </div>
        </div>
    )
})

const mapStateToProps = (state: ReducerType) => ({
    todos: state.todo.data
})
export default connect(mapStateToProps)(ToDoPage)