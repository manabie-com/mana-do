import React, { useContext } from 'react';
import { TodoContext } from 'App';
import { TodoStatus } from 'models/todo';
import {
  deleteAllTodos,
  toggleAllTodos,
} from 'store/actions';
import './index.scss';
import { ActionBtn } from './ActionBtn';

// type EnhanceTodoStatus = TodoStatus | 'ALL';

export const Toolbar = () => {
  const { todos, dispatch } = useContext(TodoContext);
  // const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked))
  }

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  }

  return (
    <div className="todo-toolbar">
      {todos.length > 0 ?
        <input
          type="checkbox"
          onChange={onToggleAllTodo}
        /> : <div />
      }
      <div className="todo-toolbar__tabs">
        <ActionBtn todoStatus={''} />
        <ActionBtn todoStatus={TodoStatus.ACTIVE} />
        <ActionBtn todoStatus={TodoStatus.COMPLETED} />
      </div>
      <a href={'#/'} className="action-btn" onClick={onDeleteAllTodo}>
        Clear all todos
      </a>
    </div>
  )
}