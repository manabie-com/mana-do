import React, { useRef, useState } from "react";
import { Constants } from "../../../constants";
import { useTodo } from "../../../hooks/useTodo";
import {
  deleteTodo,
  updateTodoContent,
  updateTodoStatus,
} from "../../../store/actions";
import { isTodoCompleted } from "../../../utils";
import { ITodoItemProps } from "./ITodoItemProps";
import "./todoItem.scss";

const TodoItem = ({ todo }: ITodoItemProps): JSX.Element => {
  const { dispatch } = useTodo();

  const [editable, setEditable] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(todo.content);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeContent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === Constants.ENTER && editContent) {
      dispatch(updateTodoContent(todo.id, editContent));
      setEditContent("");
      setEditable(false);
    }
  };

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTodoStatus(todo.id, e.target.checked));
  };

  const onDeleteTodo = () => {
    // we should show popup confirmation before clear all
    if (window.confirm("Are you sure to delete ?")) {
      dispatch(deleteTodo(todo.id));
    }
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={isTodoCompleted(todo)}
        onChange={onUpdateTodoStatus}
        className="todo-item__checkbox"
        data-testid="checkbox"
      />
      <label
        onDoubleClick={() => {
          setEditable(true);
          setEditContent(todo.content);
          inputRef.current?.focus();
        }}
      >
        {editable ? (
          <input
            autoFocus
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            type="text"
            onBlur={() => {
              setEditable(false);
              setEditContent(todo.content);
            }}
            onKeyDown={onChangeContent}
            ref={inputRef}
            className="todo-item__edit"
          />
        ) : (
          <span>{todo.content}</span>
        )}
      </label>
      <a
        href="#/"
        data-testid="delete"
        className="todo-item__delete"
        onClick={onDeleteTodo}
      >
        &times;
      </a>
    </div>
  );
};

export default TodoItem;
