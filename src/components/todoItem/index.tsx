import React, { useState } from "react";
import "./todoItem.css";
import { Todo } from "../../models/todo";
import { AppActions, deleteTodo } from "../../store/actions";
import { isTodoCompleted } from "../../utils";
import CheckBox from "../checkbox";
import PopupContainer from "../../Containers/popupContainer";

interface ITodoItem {
  todo: Todo;
  onUpdateTodoStatus: Function;
  todosDispatch: React.Dispatch<AppActions> | undefined;
}

const TodoItem: React.FC<ITodoItem> = ({
  todo,
  onUpdateTodoStatus,
  todosDispatch,
}) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      {showPopup && <PopupContainer {...{ todo, setShowPopup }} />}
      <div className="todo__item" data-testid={"todoItem-" + todo.id}>
        <CheckBox
          checked={isTodoCompleted(todo)}
          onChange={(e) => onUpdateTodoStatus(e, todo.id)}
        />
        <span
          data-testid={"content-" + todo.id}
          className="todo__content"
          onDoubleClick={() => {
            setShowPopup(true);
          }}
        >
          {todo.content}
        </span>
        <button
          className="todo__delete"
          onClick={() => todosDispatch?.(deleteTodo(todo.id))}
        >
          X
        </button>
      </div>
    </>
  );
};

export default TodoItem;
