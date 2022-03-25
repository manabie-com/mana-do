import { DeleteFilled } from "@ant-design/icons";
import { Checkbox, Popconfirm } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  deleteTodo,
  editTodo,
  updateTodoStatus,
} from "../store/actions";
import "./TodoTask.css";

type TodoTaskProps = {
  todo: Todo;
  dispatch: (value: AppActions) => void;
};

const TodoTask: React.FC<TodoTaskProps> = ({ todo, dispatch }) => {
  const [inputEditTodoValue, setInputEditTodoValue] = useState("");
  const [activeEditTodoId, setActiveEditTodoId] = useState<
    string | undefined
  >();
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (activeEditTodoId) {
      inputRef.current.focus();
    }
  }, [activeEditTodoId]);

  const showEditTodoInput = (id: string, currentContent: string) => {
    setActiveEditTodoId(id);
    setInputEditTodoValue(currentContent);
  };

  const onChangeEditInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEditTodoValue(e.target.value);
  };

  const onCancelEdit = () => {
    setActiveEditTodoId(undefined);
  };

  const onDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const onEditTodoSubmit = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string
  ) => {
    // check enter keyboards event and input blank
    if (e.key === "Enter" && inputEditTodoValue.trim() !== "") {
      dispatch(editTodo(id, inputEditTodoValue));
      // clear input
      setInputEditTodoValue("");
      setActiveEditTodoId(undefined);
    }
  };

  const onUpdateTodoStatus = (e: CheckboxChangeEvent, todoId: string) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const taskBg = classNames(
    "ToDo__item",
    { "bg-lime-400": todo.status === TodoStatus.COMPLETED },
    { "bg-blue-400": todo.status === TodoStatus.ACTIVE }
  );

  return (
    <div className={taskBg}>
      <div className="Item__leftSide">
        <Checkbox
          checked={todo.status === TodoStatus.COMPLETED}
          onChange={(e) => onUpdateTodoStatus(e, todo.id)}
        />
        {activeEditTodoId !== todo.id ? (
          <div
            className="mx-4 cursor-pointer text-lg break-all"
            onDoubleClick={() => showEditTodoInput(todo.id, todo.content)}
          >
            {todo.content}
          </div>
        ) : (
          <input
            className="ml-4"
            type="text"
            ref={inputRef}
            value={inputEditTodoValue}
            onKeyDown={(e) => onEditTodoSubmit(e, todo.id)}
            onChange={onChangeEditInputValue}
            onBlur={onCancelEdit}
          />
        )}
      </div>
      <Popconfirm
        title="Are you sure to delete this task？"
        okText="Yes"
        cancelText="No"
        onConfirm={() => onDeleteTodo(todo.id)}
      >
        <button className="Todo__delete">
          <DeleteFilled className="fonts text-xl Delete__btn" />
        </button>
      </Popconfirm>
    </div>
  );
};

export default TodoTask;
