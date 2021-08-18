import React from "react";
import { TodoStatus, Todo } from "../models";
import "./Footer.css";
import classnames from "classnames";

type EnhanceTodoStatus = TodoStatus | "ALL";
type Props = {
  setShowing: (value: React.SetStateAction<EnhanceTodoStatus>) => void;
  onDeleteAllTodo: () => void;
  todos: Array<Todo>;
  isTodoCompleted: (todo: Todo) => boolean;
  onToggleAllTodo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showing: EnhanceTodoStatus;
};
const Footer: React.FC<Props> = ({
  todos,
  showing,
  isTodoCompleted,
  setShowing,
  onDeleteAllTodo,
  onToggleAllTodo,
}) => {
  console.log({ showing });
  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);
  return (
    <div className="Todo__toolbar">
      {todos.length > 0 ? (
        <input
          type="checkbox"
          checked={activeTodos === 0}
          onChange={onToggleAllTodo}
        />
      ) : (
        <div />
      )}
      <div className={"Todo__tabs"}>
        <div
          className={classnames({
            Action__btn: true,
            Action__btn__active: showing === "ALL",
          })}
          onClick={() => setShowing("ALL")}
        >
          All
        </div>
        <div
          className={classnames({
            Action__btn: true,
            Action__btn__active: showing === "ACTIVE",
          })}
          onClick={() => setShowing(TodoStatus.ACTIVE)}
        >
          Active
        </div>
        <div
          className={classnames({
            Action__btn: true,
            Action__btn__active: showing === "COMPLETED",
          })}
          onClick={() => setShowing(TodoStatus.COMPLETED)}
        >
          Completed
        </div>
      </div>
      <div className="Action__btn" onClick={onDeleteAllTodo}>
        Clear all todos
      </div>
    </div>
  );
};

export default Footer;
