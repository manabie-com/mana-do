import React from 'react';
import { TodoStatus } from '../../models/todo';
import { isTodoCompleted } from '../../utils';
import { deleteAllTodos, toggleAllTodos } from './store/actions';
import { useTodoContext } from './ToDoContext';

const ToDoToolbar = (props: any) => {
  const {showing, setShowing} = props;
  const { state: { todos }, dispatch } = useTodoContext();

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

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
          checked={activeTodos === 0}
          onChange={onToggleAllTodo}
        /> : <div />
      }
      <div className="Todo__tabs">
        <button className={`Action__btn --tab ${showing === 'ALL' ? '--selected': ''}`} onClick={() => setShowing('ALL')}>
          All
        </button>
        <button className={`Action__btn --tab ${showing === TodoStatus.ACTIVE ? '--selected': ''}`} onClick={() => setShowing(TodoStatus.ACTIVE)}>
          Active
        </button>
        <button className={`Action__btn --tab ${showing === TodoStatus.COMPLETED ? '--selected': ''}`} onClick={() => setShowing(TodoStatus.COMPLETED)}>
          Completed
        </button>
      </div>
      <button className="Action__btn" onClick={onDeleteAllTodo}>
        Clear all todos
      </button>
    </div>
  );
};

export default ToDoToolbar;
