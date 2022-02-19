import React, { useEffect, useRef, useState } from "react";

import { Todo, TodoStatus } from "../../models/todo";
import "./style.css";
import Checkbox from "../ResourceComponents/Checkbox";
import { isTodoCompleted } from "../../utils";
import {
  deleteTodo,
  updateTodoContent,
  updateTodoStatus,
} from "../../store/actions";

type TodoItemProps = {
  data: Todo;
  showing?: boolean;
  moveOutAnimation?: boolean;
  offsetAnimation?: number;
  dispatch: Function;
};

const TodoItem = (props: TodoItemProps) => {
  const { data, showing, moveOutAnimation, offsetAnimation, dispatch } = props;
  const [edit, setEdit] = useState<boolean>(false);
  const [textOverflow, setTextOverflow] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const textRef = useRef<any>(null);

  //text overflow handling
  useEffect(() => {
    if (textRef.current?.clientWidth < textRef.current?.scrollWidth)
      setTextOverflow(true);
    else setTextOverflow(false);
  });

  const onUpdateTodoStatus = (checked: boolean) => {
    dispatch(updateTodoStatus(data.id, checked));
  };

  const onUpdateTodoContent = (content: string) => {
    dispatch(updateTodoContent(data.id, content));
  };

  const onDeleteTodo = () => {
    dispatch(deleteTodo(data.id));
  };

  const onKeyDown = async (e: React.KeyboardEvent<any>) => {
    if (e.key === "Enter") {
      if (inputRef.current.value === "") return;
      onUpdateTodoContent(inputRef.current.value);
      setEdit(false);
    }
  };

  return (
    <div
      className={`ToDo__item ${data.status?.toLocaleLowerCase()}${
        moveOutAnimation ? " move-out" : ""
      }${showing ? " showing" : " hiding"}`}
      style={{ animationDelay: offsetAnimation + "s" }}
      onMouseEnter={() => {}}
      data-testid="todo-item"
    >
      <Checkbox
        defaultChecked={isTodoCompleted(data)}
        onChange={onUpdateTodoStatus}
      />
      {!edit ? (
        <span
          ref={textRef}
          data-testid="todo-item-content"
          className="ToDo__text"
          onDoubleClick={() => setEdit(true)}
        >
          {data.content}
          {textOverflow && (
            <span className="ToDo__text_full">
              {!edit ? (
                data.content
              ) : (
                <input
                  data-testid="todo-item-input"
                  className="Todo__item_input"
                  defaultValue={data.content}
                  ref={inputRef}
                  onKeyDown={onKeyDown}
                  autoFocus
                  onBlur={() => {
                    inputRef.current.value = data.content;
                    setEdit(false);
                  }}
                ></input>
              )}
            </span>
          )}
        </span>
      ) : (
        <>
          <input
            data-testid="todo-item-input"
            className="Todo__item_input"
            defaultValue={data.content}
            ref={inputRef}
            onKeyDown={onKeyDown}
            autoFocus
            onBlur={() => {
              inputRef.current.value = data.content;
              setEdit(false);
            }}
          ></input>
        </>
      )}
      <button
        className="Todo__delete"
        data-testid="todo-item-delete"
        onClick={onDeleteTodo}
      >
        ✕
      </button>
    </div>
  );
};

export default TodoItem;
