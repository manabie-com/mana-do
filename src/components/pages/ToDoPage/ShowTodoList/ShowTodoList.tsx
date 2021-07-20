import React from 'react'
import { AppActions } from '../../../../store/actions';
import { Todo, TodoStatus } from '../../../../models/todo';
import TodoItem from '../TodoItem/TodoItem';


interface IShow {
    showing: TodoStatus | "ALL",
    todos: Todo[],
    dispatch: React.Dispatch<AppActions>
}

const message = {
    allActive: <div>Damn! There's no task done!</div>,
    allCompleted: <div>Well done! There's no task left!</div>,
    nothing: <div><p>You do not have any task today!</p><br /><p>Let's do something!</p> </div>
}

const showMessage = (showing: TodoStatus | 'ALL') => {
    switch (showing) {
        case TodoStatus.COMPLETED:
            return message.allActive
        case TodoStatus.ACTIVE:
            return message.allCompleted
        default:
            return message.nothing
    }
}

const ShowTodoList = ({ showing, todos, dispatch }: IShow) => {
    if (todos.length !== 0) {
        localStorage.setItem('task', JSON.stringify(todos))
    }

    const showTodos = todos.filter((todo: any) => {
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
        <div className='ToDo__list'>
            {showTodos.length === 0 && showMessage(showing)}
            {showTodos.map((todo, index) => {
                return (
                    <TodoItem todo={todo} dispatch={dispatch} key={index} todosLength={todos.length} />
                );
            })}
        </div>
    )
}
export default ShowTodoList;