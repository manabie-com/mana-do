import React, { ChangeEventHandler, MouseEventHandler } from 'react';
import { TodoStatus } from '../../models/todo';
import './todo-toolbar.style.css'
interface ITodoToolbarProps {
  setShowing(ACTIVE: TodoStatus): void;
  onDeleteAllTodo: MouseEventHandler<HTMLButtonElement> | undefined;
  onToggleAllTodo: ChangeEventHandler<HTMLInputElement> | undefined;
  todos: any;
  showingStatus: string;
}


export const TodoToolbar = (props: ITodoToolbarProps) => {

  return (
    <div className="ToDo__toolbar">

     <div className="ToDo__checkbox"  >
        <input
          id="select-all"
          onChange={props.onToggleAllTodo}
          type="checkbox"
        />
        <label htmlFor="select-all"></label>
      </div>


      <div className="ToDo__toolbar_container">
        <button className={`ToDo__toolbar_button ${props.showingStatus === TodoStatus.ALL && 'ToDo__toolbar_button--active'}`} onClick={() => props.setShowing(TodoStatus.ALL)}>
          All
        </button>
        <button className={`ToDo__toolbar_button ${props.showingStatus === TodoStatus.ACTIVE && 'ToDo__toolbar_button--active'}`} onClick={() => props.setShowing(TodoStatus.ACTIVE)}>
          Active
        </button>
        <button className={`ToDo__toolbar_button ${props.showingStatus === TodoStatus.COMPLETED && 'ToDo__toolbar_button--active'}`} onClick={() => props.setShowing(TodoStatus.COMPLETED)}>
          Completed
        </button>
      </div>
      <button className="ToDo__toolbar_button" onClick={props.onDeleteAllTodo}>
        Clear all todos
      </button>
    </div>
  )
}

