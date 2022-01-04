import React, { useState } from "react";
import { ToDoWrapper } from "./Footer.styles";
import { Todo, TodoStatus } from "models/todo";

type EnhanceTodoStatus = TodoStatus | "ALL";

interface Props {
  showing: EnhanceTodoStatus;
  todos: Array<Todo>;
  activeTodos: number;
  setShowing: React.Dispatch<React.SetStateAction<EnhanceTodoStatus>>;
  onDeleteAllTodo: () => void;
  onToggleAllTodo: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Footer: React.FC<Props> = (props) => {
  const {
    showing,
    todos,
    activeTodos,
    onToggleAllTodo,
    setShowing,
    onDeleteAllTodo,
  } = props;

  return (
    <ToDoWrapper>
      <div className="footer">
        <div className="footer__toolbar">
          <span className="footer__todo-count">
            <strong>{todos.length}</strong>
            <span> </span>
            <span>{todos.length > 1 ? "items" : "item"}</span>
            <span> left</span>
          </span>

          <ul className="footer__tabs">
            <li>
              <a
                className={`${showing === "ALL" ? "selected" : ""}`}
                onClick={() => setShowing("ALL")}
              >
                All
              </a>
            </li>
            <span></span>
            <li>
              <a
                className={`${showing === "ACTIVE" ? "selected" : ""}`}
                onClick={() => setShowing(TodoStatus.ACTIVE)}
              >
                Active
              </a>
            </li>
            <span></span>
            <li>
              <a
                className={`${showing === "COMPLETED" ? "selected" : ""}`}
                onClick={() => setShowing(TodoStatus.COMPLETED)}
              >
                Completed
              </a>
            </li>
          </ul>
          <button className="footer__clear-completed" onClick={onDeleteAllTodo}>
            Clear all todos
          </button>
        </div>
      </div>
    </ToDoWrapper>
  );
};

export default Footer;
