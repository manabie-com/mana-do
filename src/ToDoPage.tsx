// hooks
import React, {useEffect, useReducer, useState} from 'react';

// components
import {TodoItem} from './components/TodoItem'

// utils
import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    updateTodo
} from './store/actions';
import Service from './service';
import {Todo, TodoStatus} from './models/todo';
import {isTodoCompleted} from './utils';

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const [todoContent, setTodoContent] = useState('')

    // This func is used to get todo-list
    const handleGetTodoList = async () => {
        const resp = await Service.getTodos();
        dispatch(setTodos(resp || []));
    }

    // This hook is used to get todo-list
    useEffect(()=>{
        handleGetTodoList()
    }, [])

    // Submit to create todo-list
    const onCreateTodo = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const resp = await Service.createTodo(todoContent)
        dispatch(createTodo(resp))
        setTodoContent('')
    }

    // The change event to handle change todo-name
    const handleChangeTodoContent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodoContent(event.target.value)
    }

    // This func is used to edit a todo based on todo-id
    const handleEditTodo = async ({id, ...todo}: Todo) => {
        await Service.updateTodo(id, todo)
        dispatch(updateTodo(id, todo))
    }

    // The change event to handle change todo-status
    const onUpdateTodoStatus = async (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        const status = e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
        await Service.updateTodo(todoId, { status })
        dispatch(updateTodoStatus(todoId, status))
    }

    // This func is used to check/un-check all todo-item
    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    // This func is used to DELETE ALL todo-item
    const onDeleteAllTodo = async () => {
        await Service.removeAllTodo()
        dispatch(deleteAllTodos());
    }

    // This func is used to DELETE a todo
    const handleDeleteTodo = async (event: React.MouseEvent<HTMLButtonElement>, todoId: string) => {
        await Service.removeTodo(todoId)
        dispatch(deleteTodo(todoId))
    }

    // Filter todo-list based on "showing" variable
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

    // TBD
    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    return (
        <div className="ToDo__container">
            {/* Todo Form */}
            <form className="Todo__creation" onSubmit={onCreateTodo}>
                <input
                    value={todoContent}
                    required
                    name="todo_name"
                    className="Todo__input"
                    placeholder="What need to be done?"
                    onChange={handleChangeTodoContent}
                />
            </form>
            {/* Todo List */}
            <div className="ToDo__list">
                {showTodos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        data={todo} 
                        onChangeStatus={onUpdateTodoStatus} 
                        onDelete={handleDeleteTodo}
                        onEdit={handleEditTodo}
                    />
                ))}
            </div>
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        checked={activeTodos === 0}
                        onChange={onToggleAllTodo}
                    /> : <div/>
                }
                <div className="Todo__tabs">
                    <button className="Action__btn active" onClick={()=>setShowing('ALL')}>
                        All
                    </button>
                    <button className="Action__btn" onClick={()=>setShowing(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button className="Action__btn" onClick={()=>setShowing(TodoStatus.COMPLETED)}>
                        Completed
                    </button>
                </div>
                <button className="Action__btn delete" onClick={onDeleteAllTodo}>
                    Clear all todos
                </button>
            </div>
        </div>
    );
};

export default ToDoPage;