import React, { useEffect, useReducer } from "react";
import reducer, { initialState } from "../../store/reducer";
import {
  toggleAllTodos,
} from "../../store/actions";
import { TodoStatus } from "../../models/todo";
import { isTodoCompleted } from "../../utils";

type Props = {
  setShowing: Function;
  showing: string;
  onDeleteAllTodo: Function;
  onToggleAllTodo: Function;
  activeTodos: number;
};
const Sort = ({ setShowing, showing, onDeleteAllTodo, onToggleAllTodo, activeTodos }: Props) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="Todo__toolbar">
      {todos.length > 0 ? (
        <input
          type="checkbox"
          checked={activeTodos === 0}
          onChange={(e)=>onToggleAllTodo(e)}
        />
      ) : (
        <div />
      )}
      <div className="Todo__tabs">
        <button
          className={`Action__btn ${showing === "ALL" ? "active all" : ""} `}
          onClick={() => setShowing("ALL")}
        >
          All
        </button>
        <button
          className={`Action__btn ${
            showing === TodoStatus.ACTIVE
              ? "active " + TodoStatus.ACTIVE.toLowerCase()
              : ""
          } `}
          onClick={() => setShowing(TodoStatus.ACTIVE)}
        >
          Active
        </button>
        <button
          className={`Action__btn ${
            showing === TodoStatus.COMPLETED
              ? "active " + TodoStatus.COMPLETED.toLowerCase()
              : ""
          } `}
          onClick={() => setShowing(TodoStatus.COMPLETED)}
        >
          Completed
        </button>
        <button className={`Action__btn clearAll`} onClick={()=>onDeleteAllTodo()}>
          Clear all
        </button>
      </div>
    </div>
  );
};

export default Sort;
