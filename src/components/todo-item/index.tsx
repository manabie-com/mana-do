import React, { FunctionComponent, useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { Todo, TodoStatus } from "../../models/todo";
import Button from "../button";
import { DeleteIcon } from "../icon";
import Input from "../input";

import './styles.css';

interface TodoItemProps {
  todo: Todo,
  onUpdateTodoStatus: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newContent: string) => void;
}
const TodoItem: FunctionComponent<TodoItemProps> = ({ todo, onUpdateTodoStatus, onDelete, onEdit }) => {

  const [isEditting, setIsEditting] = useState<boolean>(false);
  
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onClickOutSideHandler = () => {
    onEditTodo(undefined, true);
    setIsEditting(false)
  }
  useOnClickOutside(inputRef, onClickOutSideHandler);


  const onEditTodo = (e?: React.KeyboardEvent<HTMLInputElement>, isOutSide?: boolean) => {
    if (isOutSide || (e && e.key === "Enter")) {
      let newContent = "";
      if (inputRef && inputRef.current) {
        newContent = inputRef.current.value;
      };
      if (newContent && newContent !== todo.content) {
        onEdit(todo.id, newContent);
      }
      setIsEditting(false);
    }
  }

  return (
    <div key={todo.id} className={`ToDo__item ToDo__item--${todo.status}`} onDoubleClick={() => setIsEditting(true)}>
      {isEditting
        ? <Input
          autoFocus
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onEditTodo}
          defaultValue={todo.content}
        />
        : <>
          <input
            type="checkbox"
            checked={todo.status === TodoStatus.COMPLETED}
            onChange={(e) => onUpdateTodoStatus(e, todo.id)}
          />
          <span>{todo.content}</span>
          <Button variant="icon" onClick={() => onDelete(todo.id)}>
            <DeleteIcon />
          </Button>
        </>}
    </div>
  );
}

export default TodoItem