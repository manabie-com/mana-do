import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { isTodoCompleted } from "../../utils";
export default function TodoItems({ ...props }) {
  const {
    onClickDeleteTodo = () => {},
    onUpdateTodoStatus = () => {},
    onUpdateTodoContent = () => {},
    todo = {
      content: "",
    },
  } = props;
  const ref = useRef(null);
  const inputRef = useRef(null);
  const [edit, setEdit] = useState(false);
  const { t } = useTranslation();
  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setEdit(false);
      if (inputRef && inputRef.current) {
        inputRef.current.value = todo.content;
      }
      try {
        document.removeEventListener("mousedown", handleClickOutside);
      } catch (error) {}
    }
  };
  const handleEnterKeyboard = (e) => {
    if (e.key === "Enter") {
      const newValue =
        (inputRef && inputRef.current && inputRef.current.value) || "";
      onUpdateTodoContent(newValue, todo.id);
      try {
        document.removeEventListener("mousedown", handleClickOutside);
      } catch (error) {}
    }
  };
  useEffect(() => {
    if (edit && inputRef && inputRef.current) {
      inputRef.current.value = todo.content;
    }
    return document.removeEventListener("mousedown", handleClickOutside);
  }, [edit]);
  return (
    <div
      ref={ref}
      className={
        !isTodoCompleted(todo)
          ? "ToDo__item ma-bg-animation-revert"
          : "ToDo__item ma-bg-animation"
      }
    >
      {!edit ? (
        <div
          onDoubleClick={() => {
            if (!edit) {
              setEdit(true);
              document.addEventListener("mousedown", handleClickOutside);
            }
          }}
          className="Todo__item_sec2"
        >
          <span className="ma-content-label">{t("todo_content")}</span>
          <span className="ma-content-value">{todo.content}</span>
        </div>
      ) : (
        <div className="Todo__item_sec2">
          <span className="ma-content-label">{t("todo_content")}</span>
          <input
            ref={inputRef}
            onKeyDown={handleEnterKeyboard}
            className="ma-text ma-input-edit ma-input-edit-todo"
          />
        </div>
      )}
      <div className="Todo__item_sec4 ma-date-create">
        <div className="ma-date-create-label">{t("date_create")}</div>
        <div className="ma-date-create-value">
          {moment(todo.created_date).format("HH:mm | DD/MM/YYYY")}
        </div>
      </div>
      <div className={"Todo__item_sec1"}>
        {isTodoCompleted(todo) ? (
          <img
            alt="mana-do"
            src="/img/TodoScreen/checked.svg"
            onClick={() => {
              onUpdateTodoStatus(false, todo.id);
            }}
          />
        ) : (
          <img
            alt="mana-do"
            src="/img/TodoScreen/in_progress.svg"
            onClick={() => {
              onUpdateTodoStatus(true, todo.id);
            }}
          />
        )}
        <img
          alt="mana-do"
          onClick={() => {
            onClickDeleteTodo(todo.id);
          }}
          src="/img/TodoScreen/delete.svg"
        />
      </div>
    </div>
  );
}
