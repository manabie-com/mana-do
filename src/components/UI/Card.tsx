import React from "react";
import { Todo } from "../../models/todo";
import { isTodoCompleted } from "../../utils";

type Props = {
  todoList: Todo[];
  onUpdateTodoStatus: Function;
  deleteTodo: Function;
  onTogglePopup: Function;
};
const Card = ({
  todoList,
  onUpdateTodoStatus,
  deleteTodo,
  onTogglePopup,
}: Props) => {
  return (
    <div className="ToDo__list">
      {todoList.map((todo: any, index: number) => {
        return (
          <div
            key={index}
            className="ToDo__item"
            onDoubleClick={(e) => onTogglePopup(e, todo)}
          >
            <input
              type="checkbox"
              checked={isTodoCompleted(todo)}
              onChange={(e) => onUpdateTodoStatus(e, todo.id)}
            />
            <span>{todo.content}</span>
            <button
              className="Todo__delete"
              onClick={() => deleteTodo(todo.id)}
            >
              X
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
