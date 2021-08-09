import React from 'react';
import Checkbox from "../Atoms/Checkbox"
import {isTodoCompleted} from "../../utils"
import Button from "../Atoms/Button"

const ToDoItem = ({todo, wrapClass= 'ToDo__item', onSelect, onDelete}: any) => {
  return <div className={wrapClass}>
    <Checkbox
      checked={isTodoCompleted(todo)}
      onChange={(e: any) => onSelect(e, todo.id)}
    />
    <span>{todo.content}</span>
    <Button className="Todo__delete"
      onClick={() => onDelete(todo.id)} text="x" />
  </div>;
};

export default ToDoItem;
