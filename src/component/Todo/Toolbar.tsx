import React from "react";
import { toggleAllTodos, deleteAllTodos } from "store/actions";
import Trash from "component/Icons/Trash";
import { DeleteAllTodosAction, ToggleAllTodosAction } from "store/actions";

interface IToolbar {
  hasTodo: boolean;
  activeTodos: number;
  dispatch: React.Dispatch<DeleteAllTodosAction | ToggleAllTodosAction>;
}

interface ButtonProps {
  cb: () => void;
  Icon: JSX.Element;
  buttonName: string;
}

const Toolbar = ({ hasTodo, activeTodos, dispatch }: IToolbar) => {
  const renderDeleteAllButton = ({ cb, Icon, buttonName }: ButtonProps) => {
    return (
      <button
        data-testid="btn-delete-all"
        className={`action__btn`}
        onClick={cb}
      >
        <span className="action__name">{buttonName}</span>
        <span className="action__logo">{Icon}</span>
      </button>
    );
  };

  return (
    <>
      <div data-testid="toolbar" className="todo__toolbar">
        <span
          className="todo__checkbox"
          data-testid="toggle-all-wrapper"
          style={{
            opacity: hasTodo ? 1 : 0,
            visibility: hasTodo ? "visible" : "hidden",
            transition: "opacity .4s ease",
          }}
        >
          <input
            type="checkbox"
            id={`checkbox-toggle-all}`}
            disabled={hasTodo ? false : true}
            checked={activeTodos === 0}
            onChange={(e) => dispatch(toggleAllTodos(e.target.checked))}
            data-testid="input-toggle-all"
          />
          <label className="todo__label" htmlFor={`checkbox-toggle-all}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                d="M1.73 12.91l6.37 6.37L22.79 4.59"
              />
            </svg>
          </label>
          <span className="action__name">Toggle All</span>
        </span>

        {hasTodo &&
          renderDeleteAllButton({
            cb: () => dispatch(deleteAllTodos()),
            Icon: <Trash />,
            buttonName: "Clear all",
          })}
      </div>
    </>
  );
};

export default Toolbar;
