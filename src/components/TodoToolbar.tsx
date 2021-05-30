import React from "react";
import { Todo, TodoStatus } from "../models/todo";
import { isTodoCompleted } from "../utils";
import ActionButton from "./ActionButton";

type EnhanceTodoStatus = TodoStatus | "ALL";

interface TodoToolbarProps {
  selectedTab: EnhanceTodoStatus;
  todos: Array<Todo>;
  onToggleAllTodos: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSetSelectedTab: (tab: EnhanceTodoStatus) => void;
  onDeleteAllTodos: () => void;
}

const listTabs: EnhanceTodoStatus[] = [
  "ALL",
  TodoStatus.ACTIVE,
  TodoStatus.COMPLETED,
];

export default function TodoToolbar({
  selectedTab,
  todos,
  onToggleAllTodos,
  onSetSelectedTab,
  onDeleteAllTodos,
}: TodoToolbarProps) {
  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo.status) ? accum : accum + 1;
  }, 0);

  return (
    <div className="todo__toolbar">
      {todos.length > 0 ? (
        <input
          type="checkbox"
          checked={activeTodos === 0}
          onChange={onToggleAllTodos}
        />
      ) : (
        <div />
      )}
      <div className="todo__tabs">
        {listTabs.map((status) => (
          <ActionButton
            key={status}
            text={status.toLowerCase()}
            active={selectedTab === status}
            onClick={() => onSetSelectedTab(status)}
          />
        ))}
      </div>
      <div className="todo__clear">
        <ActionButton text="Clear all todos" onClick={onDeleteAllTodos} />
      </div>
    </div>
  );
}
