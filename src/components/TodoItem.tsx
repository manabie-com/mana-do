import React, { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Todo } from "../models/todo";
import { isTodoCompleted } from "../utils";
import DeleteIcon from "./svg/DeleteIcon";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid lightgrey;
  padding: 5px 15px;
  min-height: 61px;
  box-sizing: border-box;

  > input {
    flex-shrink: 0;
  }

  > span {
    flex: 1 1;
    text-align: left;
    margin-left: 8px;
    padding: 10px 0;
    word-break: break-all;
  }

  &.completed {
    span {
      text-decoration: line-through;
      color: lightgray;
    }
  }

  &:hover {
    .todo-item__delete-btn {
      opacity: 1;
    }
  }

  .todo-item {
    &__delete-btn {
      outline: none;
      border: none;
      width: 30px;
      height: 30px;
      min-width: auto;
      min-height: auto;
      box-shadow: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s ease-in;
      background-color: transparent;
      fill: red;

      flex-shrink: 0;

      @media screen and (max-width: 767px) {
        opacity: 1
      }
    }

    &__input {
      min-height: 36px;
      width: 90%;
    }
  }
`;

interface TodoItemProps {
  todo: Todo;
  onUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
  onUpdateContent: (content: string) => void;
}

export default function TodoItem({
  todo,
  onUpdate,
  onDelete,
  onUpdateContent,
}: TodoItemProps) {
  const [enableEdit, setEnableEdit] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const isCompleted = useMemo(
    () => isTodoCompleted(todo.status),
    [todo.status]
  );

  const handleEdit = () => {
    setEnableEdit(true);
    setTimeout(() => {
      inputRef?.current?.focus();
    });
  };

  const handleInputPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const content = (inputRef?.current?.value || "").trim();
      
      // delete todo in case of empty content
      if (content === "") {
        onDelete();
      } else {
        onUpdateContent(content);
      }
      setEnableEdit(false);
    }
  };

  return (
    <Container className={`todo-item ${isCompleted ? "completed" : ""}`}>
      {enableEdit ? (
        <input
          ref={inputRef}
          className="todo-item__input"
          defaultValue={todo.content}
          onKeyPress={handleInputPress}
          onBlur={() => setEnableEdit(false)}
        />
      ) : (
        <>
          <input type="checkbox" checked={isCompleted} onChange={onUpdate} />
          <span onDoubleClick={handleEdit}>{todo.content}</span>
        </>
      )}
      <button className="todo-item__delete-btn" onClick={onDelete}>
        <DeleteIcon />
      </button>
    </Container>
  );
}
