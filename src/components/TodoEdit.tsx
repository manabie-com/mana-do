import React, { useState, useContext, useRef } from "react";
import { AppContext } from "../store/AppProvider";
import { TodoEditInterface } from "../models/todo";
import { updateTodo } from "../store/actions";
import ClickOutside from "../utils/ClickOutside";
import { MdEdit } from "react-icons/md";

const TodoEdit = ({ todo }: TodoEditInterface) => {
  const { dispatch } = useContext(AppContext);
  const ref = useRef(null);
  const [edit, setEdit] = useState(false);
  const [newTodo, setNewTodo] = useState(todo?.content);

  ClickOutside(ref, () => {
    setEdit(false);
  });

  return (
    <>
      <div ref={ref}>
        {edit ? (
          <input
            type="text"
            value={newTodo}
            data-testid="todo-edit"
            onChange={(e) => {
              setNewTodo(e.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === "Escape") {
                dispatch(updateTodo(todo.id, newTodo));
                setEdit(false);
                event.preventDefault();
                event.stopPropagation();
              }
            }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              gap: "5px",
              justifyContent: "flex-start",
              alignItems: "center",
            }}>
            <p
              onDoubleClick={() => {
                setEdit(true);
              }}
              className={`${todo.status === "COMPLETED" && "todo-item-active"}`}
              data-testid="todo-content">
              {todo.content}
            </p>
            <MdEdit className="Todo__edit" onClick={() => setEdit(true)} />
          </div>
        )}
      </div>
    </>
  );
};

export default TodoEdit;
