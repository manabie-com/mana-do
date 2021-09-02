import React from "react";

import { TodoStatus } from "models/todo";
import ToDoList from "components/molecule/TodoList";
import "./Todo.css";
import ActionButton from "components/atom/ActionButton";
import useTodo, { ToDoPageContext } from "./hooks";

const Todo = () => {
  const {
    todos,
    dispatch,
    setShowing,
    onCreateTodo,
    onToggleAllTodo,
    onDeleteAllTodo,
    showTodos,
    activeTodos,
    showing,
    inputRef,
  } = useTodo();

  return (
    <ToDoPageContext.Provider value={{ dispatch }}>
      <div className="ToDo__container">
        <div className="Todo__creation">
          <input
            ref={inputRef}
            className="Todo__input"
            placeholder="What need to be done?"
            onKeyPress={onCreateTodo}
          />
        </div>
        <ToDoList showTodos={showTodos} showing={showing} />
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
          <div className="Todo__tabs">
            <ActionButton
              onClick={() => setShowing("ALL")}
              label="All"
              data-testid="all"
              active={showing === "ALL"}
              note={String(todos.length)}
            />
            <ActionButton
              onClick={() => setShowing(TodoStatus.ACTIVE)}
              label="Active"
              data-testid="active"
              active={showing === TodoStatus.ACTIVE}
              note={String(activeTodos)}
            />
            <ActionButton
              onClick={() => setShowing(TodoStatus.COMPLETED)}
              label="Completed"
              data-testid="completed"
              active={showing === TodoStatus.COMPLETED}
              note={String(todos.length - activeTodos)}
            />
          </div>
          <button
            className="Action__btn Action__btn--delete"
            onClick={onDeleteAllTodo}
          >
            Clear all todos
          </button>
        </div>
      </div>
    </ToDoPageContext.Provider>
  );
};

export default Todo;
