import React from "react";

export default function TodoFilter({ todos = [] }): JSX.Element {
  return (
    <div className="Todo__toolbar">
      {todos.length > 0 ? (
        <input
          type="checkbox"
          // onChange={onToggleAllTodo}
        />
      ) : (
        <div />
      )}
      <div className="Todo__tabs">
        <button className="Action__btn">All</button>
        <button
          className="Action__btn"
          //   onClick={() => setShowing(TodoStatus.ACTIVE)}
        >
          Active
        </button>
        <button
          className="Action__btn"
          //   onClick={() => setShowing(TodoStatus.COMPLETED)}
        >
          Completed
        </button>
      </div>
      <button
        className="Action__btn"
        //   onClick={onDeleteAllTodo}
      >
        Clear all todos
      </button>
    </div>
  );
}
