import React, { useState } from "react";
import { ToDoWrapper } from "./Footer.styles";
import { Todo, TodoStatus } from "models/todo";

type EnhanceTodoStatus = TodoStatus | "ALL";

export interface Props {
  showing: EnhanceTodoStatus;
  todoAmount: number;
  activeTodos: number;
  onSetShowing: (option: EnhanceTodoStatus) => void;
  onDeleteAllTodo: () => void;
}

const Footer: React.FC<Props> = (props) => {
  const { showing, todoAmount, activeTodos, onSetShowing, onDeleteAllTodo } =
    props;

  return (
    <ToDoWrapper>
      <div className="footer">
        <div className="footer__toolbar">
          <span className="footer__todo-count">
            <strong>{todoAmount}</strong>
            <span> </span>
            <span>{todoAmount > 1 ? "items" : "item"}</span>
            <span> left</span>
          </span>

          <ul className="footer__tabs">
            <li>
              <a
                data-testid="btn"
                className={`${showing === "ALL" ? "selected" : ""}`}
                onClick={() => onSetShowing("ALL")}
              >
                All
              </a>
            </li>
            <span></span>
            <li>
              <a
                data-testid="btn"
                className={`${showing === "ACTIVE" ? "selected" : ""}`}
                onClick={() => onSetShowing(TodoStatus.ACTIVE)}
              >
                Active
              </a>
            </li>
            <span></span>
            <li>
              <a
                data-testid="btn"
                className={`${showing === "COMPLETED" ? "selected" : ""}`}
                onClick={() => onSetShowing(TodoStatus.COMPLETED)}
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
