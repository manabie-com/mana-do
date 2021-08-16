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
      <input
        ref={inputRef}
        className="ma-input"
        placeholder={t("what_need_to_be_done")}
        onKeyDown={onKeyDownAction}
      />
    </div>
  );
}
