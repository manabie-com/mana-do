import React, { useState } from "react";
import { Todo } from "../../models/todo";
import { isTodoCompleted } from "../../utils";
import ErrorMessage from "../ErrorMessage";
import Input from "../Input";
import { isDuplicateContent } from "../../utils/validate.utils";
import styled from "styled-components";

const ListTodo = styled.ul`
  margin-bottom: 0;
  position: relative;
  display: flex;
  list-style-type: none;
  align-items: center;
  justify-content: space-between;

  input[type="checkbox"] {
    opacity: 0;
    left: 15px;
    cursor: pointer;
    margin: auto 0;
    position: absolute;
    top: 15px;
    width: 45px;
    height: 20px;
  }

  li {
    display: flex;
    justify-content: space-between;
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23272727%22%20stroke-width%3D%223%22%2F%3E%3C%2Fsvg%3E");
    background-position: 0;
    background-repeat: no-repeat;
    padding: 15px 15px 15px 55px;
    overflow-wrap: break-word;
    width: 100%;
  }

  input[type="checkbox"]:checked + li {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23f50057%22%20stroke-width%3D%229%22%2F%3E%3Cpath%20fill%3D%22%272727d%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E");
    color: #999;
    text-decoration: line-through;
  }
  input[type="checkbox"]:checked + li > .delete {
    text-decoration: none;
  }

  .delete {
    font-weight: 200;
    cursor: pointer;
    background: none;
    border: none;
    font-size: 18px;
    font-weight: bold;
    outline: none;
  }

  .todo-item {
    padding: 0 !important;
    border: none !important;
    background-color: unset !important;
    min-height: 30px !important;
    border-bottom: 1px solid #333 !important;
    border-radius: 0 !important;
    width: 100%;
  }
`;

interface ItemTodoProps {
  todo: Todo;
  listTodos: Todo[];
  onUpdateTodoStatus: (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => void;
  onUpdateTodo: (todoId: string, newContent: string) => void;
  onDeleteTodo: (todoId: string) => void;
}

const ItemTodo: React.FC<ItemTodoProps> = (props) => {
  const { todo, listTodos } = props;
  const [state, setState] = useState({
    value: todo.content,
    readOnly: true,
    errorMessage: "",
  });

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onUpdateTodoStatus(e, todo.id);
  };

  const onDoubleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setState({ ...state, readOnly: false });
    e.currentTarget.selectionStart = e.currentTarget.selectionEnd;
  };

  const onSave = (e: any) => {
    if (state.errorMessage.length > 0) {
      setState({ ...state, errorMessage: "" });
    }

    if (!state.readOnly) {
      const valueInput = e.currentTarget.value.trim();

      if (valueInput.length !== 0) {
        if (isDuplicateContent(valueInput, listTodos)) {
          setState({ ...state, errorMessage: "Name can't be duplicate." });
        } else {
          props.onUpdateTodo(todo.id, valueInput);
          setState({ ...state, readOnly: true });
        }
      } else {
        setState({ ...state, errorMessage: "Name can't be empty." });
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setState({ ...state, value });
  };

  const onDeleteTodo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.onDeleteTodo(todo.id);
  };

  return (
    <ListTodo>
      <input
        type="checkbox"
        name={`${todo.id}`}
        checked={isTodoCompleted(todo)}
        value={todo.id}
        onChange={onUpdateTodoStatus}
      />

      <li>
        <Input
          autoComplete="off"
          type="text"
          name={`${todo.id}`}
          checked={isTodoCompleted(todo)}
          onDoubleClick={onDoubleClick}
          onBlur={onSave}
          readOnly={state.readOnly}
          value={state.value}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSave(e);
          }}
          className="todo-item"
        />
      </li>

      <button className="delete" onClick={onDeleteTodo} name={todo.id}>
        x
      </button>

      <ErrorMessage message={state.errorMessage} className="" />
    </ListTodo>
  );
};

export default ItemTodo;
