import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
let timeout = null;
export default function CreateTodo(props) {
  const inputRef = useRef(null);
  const { onCreateTodoApi = () => {} } = props;
  const { t } = useTranslation();
  const onKeyDownAction = (e) => {
    if (e.key === "Enter" && inputRef.current) {
      const value = inputRef.current.value;
      if (timeout) {
        clearTimeout(timeout); // optimize when user typing
      }
      const cb = () => {
        inputRef.current.value = "";
      };
      timeout = setTimeout(() => {
        onCreateTodoApi(value, cb);
      }, 200);
    }
  };

  return (
    <div className="Todo__creation">
      <div>
        <input
          ref={inputRef}
          className="ma-input"
          placeholder={t("what_need_to_be_done")}
          onKeyDown={onKeyDownAction}
        />
        <img
          onClick={() => {
            onKeyDownAction({ key: "Enter" });
          }}
          alt="add-todo"
          className="ma-add-todo-icon"
          src="/img/add.svg"
        ></img>
      </div>
    </div>
  );
}
