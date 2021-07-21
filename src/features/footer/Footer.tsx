import React, {useState} from 'react';

import StatusFilter from '../filters/StatusFilter';
import {TodoStatus} from "../../models/todo";
import {isTodoCompleted} from "../../utils";
import {deleteAllTodos, setFilterStatusChanged, toggleAllTodos} from "../../store/actions";
import {useAppContext} from "../../AppContext";

const Footer = () => {
  const {state: { todos }, dispatch} = useAppContext();
  const [showing, setShowing] = useState<TodoStatus>(TodoStatus.All);

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  }

  const onChangeStatus = (status: TodoStatus) => {
    setShowing(status);
    dispatch(setFilterStatusChanged(status));
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
        /> : <div/>
      }
      <div className="Todo__tabs">
        <StatusFilter status={showing} onChangeStatus={onChangeStatus}/>
      </div>
      <button className="Action__btn" onClick={onDeleteAllTodo}>
        Clear all todos
      </button>
    </div>
  )
}

export default Footer;
