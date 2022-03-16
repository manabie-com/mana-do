import React from "react";
import "./index.css";

import { Todo, TodoStatus } from "models";

export interface TodoItemProps {
  index: number;
  todo: Todo;
  onUpdateTodoStatus(status: boolean, id: string): void;
  onEditingTodo(newContent: string, id: string): void;
  onDeleteTodo(id: string): void;
}

export const TodoItem = (props: TodoItemProps) => {
  const onEnableEdit = (e: any) => {
    e.target.removeAttribute("readOnly");
  };

  const onDisableEdit = (e: any) => {
    e.target.setAttribute("readOnly", "readOnly");
  };

  return (
    <div
      data-testid="todo-item"
      key={props.index}
      className={
        "ToDo__item " +
        (props.todo.status === TodoStatus.ACTIVE
          ? "todo-color-active"
          : "todo-color-complete")
      }
    >
      <input
        type="checkbox"
        data-testid="todo-item-checkbox"
        className="todo-checkbox"
        checked={props.todo.status === TodoStatus.COMPLETED}
        onChange={(e) =>
          props.onUpdateTodoStatus(e.target.checked, props.todo.id)
        }
      />
      <input
        className="todo-item-content"
        data-testid="todo-item-content"
        type="text"
        onBlur={(e) => onDisableEdit(e)}
        onChange={(e) => props.onEditingTodo(e.target.value, props.todo.id)}
        readOnly
        onDoubleClick={(e) => onEnableEdit(e)}
        value={props.todo.content}
      />
      <button
        className="Todo__delete"
        data-testid="todo-item-delete"
        onClick={(e) => props.onDeleteTodo(props.todo.id)}
      >
        ✖
      </button>
    </div>
  );
};
