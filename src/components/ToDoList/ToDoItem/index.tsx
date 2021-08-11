import React from 'react';
import Checkbox from "../../Atoms/Checkbox"
import {isTodoCompleted} from "../../../utils"
import Button from "../../Atoms/Button"

const ToDoItem = ({todo, wrapClass= 'ToDo__item', onSelect, onDelete, onSelectEditTodo}: any) => {
  const todoStateClass = isTodoCompleted(todo) ? 'Todo__item_complete' : ''
  return <div className={wrapClass}>
    <Checkbox
      checked={isTodoCompleted(todo)}
      onChange={(e: any) => onSelect(e, todo.id)}
    />
    <span className={todoStateClass} onDoubleClick={() => onSelectEditTodo(todo)}>{todo.content}</span>
    <Button className="Todo__delete" showIcon={false}
      onClick={() => onDelete(todo.id)} text="x" />
  </div>;
};

export default ToDoItem;
