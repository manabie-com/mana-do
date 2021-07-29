import React from "react";

const ToDoTabs = ({
  todos,
  activeTodos,
  onToggleAllTodo,
  TodoStatus,
  onDeleteAllTodo,
  setShowing,
  showing
}) => {
  const _s = type => (showing === type ? " btn-Active" : "");
  return (
    <div className="Todo__toolbar">
      {todos.length > 0
        ? <input
            type="checkbox"
            checked={activeTodos === 0}
            onChange={onToggleAllTodo}
          />
        : <div />}
      <div className="Todo__tabs">
        <button
          className={"Action__btn" + _s("ALL")}
          onClick={() => setShowing("ALL")}
        >
          View all
        </button>
        <button
          className={"Action__btn" + _s("ACTIVE")}
          onClick={() => setShowing(TodoStatus.ACTIVE)}
        >
          View active
        </button>
        <button
          className={"Action__btn" + _s("COMPLETED")}
          onClick={() => setShowing(TodoStatus.COMPLETED)}
        >
          View completed
        </button>
      </div>
      <button className="Action__btn" onClick={onDeleteAllTodo}>
        Clear all todos
      </button>
    </div>
  );
};

export default ToDoTabs;
