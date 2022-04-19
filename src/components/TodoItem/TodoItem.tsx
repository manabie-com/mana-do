import * as React from "react";
import { useState } from "react";
import {
  KeydownEvent,
  TodoItemProps,
  TodoStatus,
} from "../../models/todo";
import Service from "../../service";
import { setTodos } from "../../store/actions";
import Checkbox from "../Checkbox/Checkbox";
import "./TodoItem.scss";

const TodoItem = ({ todo, dispatch }: TodoItemProps) => {
  const [value, setValue] = useState(todo.content);
  const [isEdit, setEdit] = useState(false);

  const cancelEdit = (
    e:
      | React.FocusEvent<HTMLInputElement, Element>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    setValue(todo.content);
    setEdit(false);
    e.preventDefault();
    e.stopPropagation();
  };

  const onUpdateTodoValue = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === KeydownEvent.ENTER) {
      todo.content = value;
      const resp = await Service.updateTodo(todo);
      dispatch(setTodos(resp));
      setEdit(false);
    } else if (e.key === KeydownEvent.ESCAPE) {
      cancelEdit(e);
    }
  };

  const onDeleteTodo = async () => {
    const resp = await Service.deleteTodo(todo);
    dispatch(setTodos(resp));
  };

  const checked = todo.status === TodoStatus.COMPLETED;

  const onUpdateTodoStatus = async () => {
    const status = checked ? TodoStatus.ACTIVE : TodoStatus.COMPLETED;
    todo.status = status;
    const resp = await Service.updateTodo(todo);
    dispatch(setTodos(resp));
  };

  return (
    <div
      key={todo.id}
      className="Todo__item"
      onDoubleClick={() => {
        setEdit(true);
      }}
    >
      <div className="Todo__item_checkbox">
        <Checkbox checked={checked} onToggleCheck={onUpdateTodoStatus} />
      </div>
      <div
        className={
          isEdit
            ? "Todo__item_input Todo__item_input--fullwidth"
            : "Todo__item_input"
        }
      >
        {isEdit ? (
          <input
            className="Todo__item_input--modify"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={(e) => cancelEdit(e)}
            onKeyDown={(e) => onUpdateTodoValue(e)}
            autoFocus
          />
        ) : (
          <>
            <span className={checked ? "strikethrough" : ""} />
            <span className="Todo__item_input--default">{todo.content}</span>
          </>
        )}
      </div>
      <button className="Todo__item_button--delete" onClick={onDeleteTodo}>
        <img
          src={require("../../assets/images/delete.svg").default}
          alt="deleteIcon"
          height={32}
          width={32}
        />
      </button>
    </div>
  );
};

export default TodoItem;
