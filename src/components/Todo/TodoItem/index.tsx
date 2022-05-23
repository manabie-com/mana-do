import React from 'react';
import {TodoStatus} from '../../../models/todo';


function TodoItem({ todo, index, onUpdateTodoStatus, onUpdateTodo, onDeleteTodo, editItem, setEditItem } : { todo: any, index: number, onUpdateTodoStatus: any, onUpdateTodo : any, onDeleteTodo: any, editItem: any, setEditItem: any}) {
  let mode = todo.status;
  let editMode = editItem && editItem.id === todo.id ? 'editing': '';

  return (
    <li className={ mode === TodoStatus.COMPLETED ? "completed " + editMode : editMode }>
    <div className="view">
      <input className="toggle" type="checkbox" checked={mode === TodoStatus.COMPLETED ? true: false}  onChange={(e) => onUpdateTodoStatus(e, todo.id)}/>
      <label onDoubleClick={() =>
        {
          setEditItem(todo);
        }} >{todo.content}</label>
      <button className="destroy" onClick={() => onDeleteTodo(todo.id)}></button>
    </div>
    <input id={todo.id} defaultValue={todo.content} className="edit" onKeyDown={(e) =>
      {
        onUpdateTodo(e, todo.id); 
      }}
      onBlur={
        (e) => {
          e.currentTarget.value = todo.content;
          setEditItem(null);
        }
      }
      />
  </li>
  );
}

export default TodoItem;
