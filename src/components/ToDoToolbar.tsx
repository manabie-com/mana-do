import React from 'react';

import {Todo, TodoStatus} from '../models/todo';
import {isTodoCompleted} from '../utils';
import {AppActions} from '../store/actions';
import {
  toggleAllTodos,
  deleteAllTodos
} from '../store/actions';

const ToDoToolbar = ({todos, action, updateShowing}: {todos: Array<Todo>, action: (actionT: AppActions) => void, updateShowing: (todoStatus: TodoStatus) => void}) => {
  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    action(toggleAllTodos(e.target.checked))
  };

  const onDeleteAllTodo = async () => {
    action(deleteAllTodos());
  };

  return (
    <div className="Todo__toolbar">
      {todos.length > 0 ?
          <input
              type="checkbox"
              checked={activeTodos === 0}
              onChange={onToggleAllTodo}
          /> : <div/>
      }
      <div className="Todo__tabs">
          <button className="Action__btn" onClick={()=>updateShowing(TodoStatus.ALL)}>
              All
          </button>
          <button className="Action__btn" onClick={()=>updateShowing(TodoStatus.ACTIVE)}>
              Active
          </button>
          <button className="Action__btn" onClick={()=>updateShowing(TodoStatus.COMPLETED)}>
              Completed
          </button>
      </div>
      <button className="Action__btn" onClick={onDeleteAllTodo}>
          Clear all todos
      </button>
  </div>
  )
}

export default ToDoToolbar;