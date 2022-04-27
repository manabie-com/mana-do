import React, { useMemo, useState, useRef, useEffect } from "react";
import { TodoStatus } from "../../models/todo";
import { TodoItemPropsInterface } from "./types";

function TodoItem(props: TodoItemPropsInterface) {
  const { todo, onDeleteTodo, onEditTodo, onUpdateTodoStatus } = props;
  const [todoInputValue, setTodoInputValue] = useState<string>(todo.content);
  const [isShowEditInput, setIsShowEditIput] = useState<boolean>(false);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isShowEditInput]);
  
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTodoInputValue(event.target.value);
  }

  const currentContentValue = useMemo(() => {
    return todo.content;
  }, [todo]);

  const onEditContentTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!todoInputValue) return;
      onEditTodo(todo.id, todoInputValue);
      toggleShowInputToEdit();
    }
  };

  const toggleShowInputToEdit = () => {
    setIsShowEditIput(!isShowEditInput);
  };

  const handleBlur = () => {
    setTodoInputValue(currentContentValue);
    toggleShowInputToEdit();
  };

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div className="ToDo__item">
      <input
        data-testid="status-checkbox"
        type="checkbox"
        checked={TodoStatus.COMPLETED === todo.status}
        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
      />
      <>
        {isShowEditInput && (
          <input
            ref={inputRef}
            data-testid="todo-input"
            className="Todo__content__input"
            value={todoInputValue}
            onKeyDown={onEditContentTodo}
            onChange={handleChange}
            onBlur={handleBlur}
            onClick={handleClick}
            required
          />
        )}
      </>
      <>
        {!isShowEditInput && (
          <span
            data-testid="todo-content"
            style={{ cursor: "pointer" }}
            onDoubleClick={toggleShowInputToEdit}
            className="Todo__content"
          >
            {todo.content}
          </span>
        )}
      </>

      <button className="Todo__delete" onClick={() => onDeleteTodo(todo.id)}>
        X
      </button>
    </div>
  );
}

export default TodoItem;
