import React, { useState, useEffect } from "react";
import { Todo } from "../models/todo";
import "./Editable.css";
import { useDispatch } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { actionCreators } from "../store";

type Props = {
  text: string;
  type: string;
  placeholder: string;
  children: React.ReactNode;
  todo: Todo;
  childRef: React.RefObject<HTMLInputElement>;
};

// Component accept text, placeholder values and also pass what type of Input - input, textarea so that we can use it for styling accordingly
const Editable: React.FC<Props> = ({
  todo,
  text,
  type,
  placeholder,
  children,
  childRef,
}) => {
  // Manage the state whether to show the label or the input box. By default, label will be shown.
  // Exercise: It can be made dynamic by accepting initial state as props outside the component
  const [isEditing, setEditing] = useState(false);
  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);
  // redux api

  const dispatch: Dispatch<any> = useDispatch();
  const { deleteTodo } = bindActionCreators(actionCreators, dispatch);

  // Event handler while pressing any key while editing
  const handleKeyUp = (
    event: React.KeyboardEvent<HTMLDivElement>,
    type: string
  ) => {
    const { key } = event;
    const keys = ["Escape", "Tab"];
    const enterKey = "Enter";
    const allKeys = [...keys, enterKey]; // All keys array

    /* 
    - For textarea, check only Escape and Tab key and set the state to false
    - For everything else, all three keys will set the state to false
    - For empty input --> deleteTodo
  */

    if (
      (type === "textarea" && keys.indexOf(key) > -1) ||
      (type !== "textarea" && allKeys.indexOf(key) > -1)
    ) {
      if (todo.content === "") deleteTodo(todo.id);
      setEditing(false);
    }
  };

  /*: 
- It will display a label is `isEditing` is false
- It will display the children (input or textarea) if `isEditing` is true
- when input `onBlur`, we will set the default non edit mode
Note: For simplicity purpose, I removed all the classnames, you can check the repo for CSS styles
*/
  return (
    <>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyUp={(e) => handleKeyUp(e, type)}
          className="Todo__content__edit"
        >
          {children}
        </div>
      ) : (
        <div
          onClick={() => setEditing(true)}
          className={
            todo.status === "COMPLETED"
              ? "Todo__content__completed"
              : `Todo__content`
          }
        >
          <span>{text || placeholder || "Edit your task"}</span>
        </div>
      )}
    </>
  );
};

export default Editable;
