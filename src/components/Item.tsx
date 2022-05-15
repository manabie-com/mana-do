import {TodoStatus} from '../models/todo';
import React from 'react';

const Item = React.memo(({todo, updateStatus, deleteTodo}:any) => {

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todo: any) => {
    updateStatus(todo.id, e.target.checked)
  }

  const onDeleteTodo = (id: any) =>{
    deleteTodo(id)
  }

  return (
    <div className="ToDo__item">
      <input
        type="checkbox"
        checked={todo.status === TodoStatus.COMPLETED}
        onChange={(e) => onUpdateTodoStatus(e, todo)}
      />
      <span>{todo.content}</span>
      <button className="Todo__delete" onClick={() => onDeleteTodo(todo.id)}>X</button>
    </div>
  );
});

export default Item
