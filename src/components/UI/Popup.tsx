import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Todo } from "../../models/todo";

import reducer, { initialState } from "../../store/reducer";
import { editTodo } from "../../store/actions";

type Props = {
  isToggle: boolean;
  onTogglePopup: Function;
  todoEdit: Todo | null;
  todolist: Todo[];
};
const Popup = ({ isToggle, onTogglePopup, todoEdit, todolist }: Props) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef<HTMLInputElement>(null);

  const onCreateTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (todoEdit !== null) {
      if (e.key === "Enter" && inputRef.current) {
        const todoEdited = {
          ...todoEdit,
          content: inputRef.current.value,
        };

        dispatch(editTodo(todoEdited));
        onTogglePopup();
      }
    }
  };

  const handleChildClick = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`Todo__popup ${isToggle ? "active" : ""}`}
      onClick={(e) => onTogglePopup(e)}
    >
      <div className="popup-form" onClick={(e) => handleChildClick(e)}>
        <input
          ref={inputRef}
          key={todoEdit?.content}
          defaultValue={todoEdit ? todoEdit.content : ""}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={(e) => onCreateTodo(e)}
        />
      </div>
    </div>
  );
};

export default Popup;
