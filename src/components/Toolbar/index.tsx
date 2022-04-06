import React, { useState, useContext } from 'react';
import { TodoContext } from 'ToDoPage';
import { TodoStatus } from 'models/todo';
import {
  deleteAllTodos,
  toggleAllTodos,
} from 'store/actions';

type EnhanceTodoStatus = TodoStatus | 'ALL';

export const Toolbar = () => {
  const { todos, dispatch } = useContext(TodoContext);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked))
  }

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  }

  return (
    <div className="Todo__toolbar">
      {todos.length > 0 ?
        <input
          type="checkbox"
          onChange={onToggleAllTodo}
        /> : <div />
      }
      <div className="Todo__tabs">
        <button className="Action__btn">
          All
        </button>
        <button className="Action__btn" onClick={() => setShowing(TodoStatus.ACTIVE)}>
          Active
        </button>
        <button className="Action__btn" onClick={() => setShowing(TodoStatus.COMPLETED)}>
          Completed
        </button>
      </div>
      <button className="Action__btn" onClick={onDeleteAllTodo}>
        Clear all todos
      </button>
    </div>
  )
}