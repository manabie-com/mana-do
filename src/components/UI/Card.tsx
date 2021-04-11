import React, { useEffect, useState } from "react";
import { Todo } from "../../models/todo";
import { isTodoCompleted } from "../../utils";
import useWindowDimensions from "../../utils/checkwindow";
import { useDoubleTap } from "use-double-tap";

type MiniProps = {
  todo: Todo;
  onUpdateTodoStatus: Function;
  onTogglePopup: Function;
  deleteTodo: Function;
};

const MiniCard = ({
  todo,
  onTogglePopup,
  onUpdateTodoStatus,
  deleteTodo,
}: MiniProps) => {
  const bind = useDoubleTap((e) => {
    onTogglePopup(e, todo);
  });
  return (
    <div
      className="ToDo__item"
      {...bind}
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
        onDoubleClick={(e) => onTogglePopup(e, todo)}
      >
        X
      </button>
    </div>
  );
};

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
      {todoList ? (
        todoList.map((todo: Todo, index: number) => {
          return (
            <MiniCard
              todo={todo}
              key={index}
              onUpdateTodoStatus={onUpdateTodoStatus}
              onTogglePopup={onTogglePopup}
              deleteTodo={deleteTodo}
            />
          );
        })
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Card;
