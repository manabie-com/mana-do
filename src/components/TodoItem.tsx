import React, { useState, useRef, useEffect } from "react";
import { KeyCode } from "../models/todo";

interface ITodoItem {
  isTodoCompleted: any;
  onUpdateTodoStatus: any;
  onUpdateTodo: any;
  onDeleteTodo: any;
  todo: any;
}

const TodoItem = ({
  isTodoCompleted,
  onUpdateTodoStatus,
  onUpdateTodo,
  onDeleteTodo,
  todo,
}: ITodoItem) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isUpdating, setUpdating] = useState(false);
  const [editTodo, setEditTodo] = useState(todo);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isUpdating]);

  const handleEditing = () => {
    setUpdating(!isUpdating);
  };

  const handleChange = (e: any) => {
    let input: string | number = e.target.value;
    setEditTodo({ ...todo, content: input });
  };

  const handleClickOutside = (e: any) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
    }
  };

  const handleKeyDown = (e: any) => {
    if (inputRef && e.keyCode === KeyCode.ESCAPE_KEY) {
      setEditTodo(todo);
      setUpdating(!isUpdating);
    } else if (e.keyCode === KeyCode.ENTER_KEY) {
      onUpdateTodo(editTodo);
      setUpdating(!isUpdating);
    }
  };

  return (
    <div className="todo_item">
      <input
        type="checkbox"
        checked={isTodoCompleted(todo)}
        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
        className="input_checked"
      />
      {isUpdating ? (
        <input
          ref={inputRef}
          value={editTodo.content}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
          onClick={handleClickOutside}
          className="input_editing"
        />
      ) : (
        <div onDoubleClick={handleEditing} className="input_text">
          {todo.content}
        </div>
      )}
      <div className="btn_delete" onClick={() => onDeleteTodo(todo.id)}>
        X
      </div>
    </div>
  );
};

export default TodoItem;
