import React, { Fragment, useEffect, useRef, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import "./TodoItem.scss";

export const TodoItem = React.forwardRef<any, ITodoItem>(
  (
    {
      id,
      content,
      checked,
      onClick,
      onChange,
      idClick,
      setIdClick,
      handleEditTodos,
    },
    ref
  ) => {
    const isEditing = id === idClick;
    const editInputRef = useRef<HTMLInputElement>(null);
    const [text, setText] = useState<string>(content);
    /** Handle Click Outside */
    useEffect(() => {
      if (idClick) {
        const handleClickOutside = (event: any) => {
          if (
            editInputRef.current &&
            !editInputRef.current.contains(event.target)
          ) {
            setIdClick("");
            setText(content);
          }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }
    }, [ref, idClick, setIdClick, content]);

    /** Handle enter press key to edit */
    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && text) {
        return handleEditTodos({ id: idClick, content: text });
      }
    };

    return (
      <Fragment>
        {!isEditing ? (
          <div className="todoitem">
            <input
              id={id}
              style={{ display: "none" }}
              type="checkbox"
              checked={checked}
              onChange={onChange}
              data-testid="TodoItem_checkbox"
            />
            <label htmlFor={id} data-testid="TodoItem_checkbox-label">
              <div
                className={`todoitem__option ${
                  checked ? "todoitem__option--checked" : ""
                }`}
              ></div>
            </label>
            <span
              onDoubleClick={() => {
                setIdClick(id);
                editInputRef.current?.focus();
              }}
              style={{
                textDecorationLine: checked ? "line-through" : "none",
                textDecorationColor: "grey",
              }}
              data-testid="TodoItem_content"
            >
              {content}
            </span>
            <MdOutlineDelete
              className="todoitem__delete"
              onClick={onClick}
              data-testid="TodoItem_btnDel"
            />
          </div>
        ) : (
          <input
            ref={editInputRef}
            className="todoitem__input"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            onKeyDown={handleOnKeyDown}
            data-testid="TodoItem_input"
          />
        )}
      </Fragment>
    );
  }
);
