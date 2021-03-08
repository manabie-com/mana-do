import React, { useContext, useState } from "react";
import Popup from "../components/popup";
import { TodosContext } from "../context";
import { Todo } from "../models/todo";
import { editTodo } from "../store/actions";

interface IPopupContainer {
  todo: Todo;
  setShowPopup: Function;
}

const PopupContainer: React.FC<IPopupContainer> = ({ todo, setShowPopup }) => {
  const { todosDispatch } = useContext(TodosContext);
  const [input, setInput] = useState(todo.content);

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const onEditTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input) {
      todosDispatch?.(editTodo(todo.id, input));
      setShowPopup(false);
      return;
    }
    if (e.key === "Escape") setShowPopup(false);
  };

  return (
    <Popup {...{ todo, setShowPopup, input, onChangeField, onEditTodo }} />
  );
};

export default PopupContainer;
