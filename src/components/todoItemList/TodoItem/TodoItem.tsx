import { Button } from "components/button";
import { Checkbox } from "components/checkbox";
import { Input } from "components/input";
import { useOnClickOutside } from "hooks";
import { InputType, Todo } from "models";
import React, { Dispatch, FC, memo, useRef, useState } from "react";
import { IoTrashBin } from "react-icons/io5";
import {
  deleteTodo,
  updateTodoContent,
  updateTodoStatus,
} from "store/action-handlers";
import { AppActions } from "store/actions";
import { getTodoStatus, isTodoCompleted } from "utils";
import "./styles.scss";

export interface ITodoItemProps extends Todo {
  dispatch: Dispatch<AppActions>;
  className?: string;
}

const TodoItem: FC<ITodoItemProps> = ({ className, dispatch, ...props }) => {
  const { id, content, status } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  /** Event handlers --- start */

  const handleUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    dispatch(updateTodoStatus(id, getTodoStatus(e.target.checked)));
  };

  const handleDeleteTodoItem = (): void => {
    dispatch(deleteTodo(id));
  };

  const handleDoubleClickToEdit = () => {
    setIsEdit(true);
  };

  const handleUpdateTodo = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ): Promise<void> => {
    if (e.key === "Enter" && inputRef.current) {
      const { value } = inputRef.current;
      if (!value) return;
      dispatch(updateTodoContent(id, value));
      setIsEdit(false);
    }
  };

  const handleClickOutsideInput = () => {
    setIsEdit(false);
  };

  useOnClickOutside(inputRef, handleClickOutsideInput);

  /** Event handlers --- end */

  return (
    <div
      className={`todo-item ${className ? className : ""}`}
      data-testid="todo-item"
      {...props}
    >
      {isEdit ? (
        <Input
          name={id}
          type={InputType.TEXT}
          ref={inputRef}
          className="todo-item__input todo-item__input--editing"
          defaultValue={content}
          onKeyDown={handleUpdateTodo}
        />
      ) : (
        <>
          <div className="todo-item__input-wrapper">
            <Checkbox
              id={id}
              checked={isTodoCompleted(status)}
              onChange={handleUpdateTodoStatus}
            />
            <label
              className={`todo-item__text ${
                isTodoCompleted(status) ? "todo-item__text--completed" : ""
              }`}
              htmlFor={id}
              data-testid="label-content"
              onDoubleClick={handleDoubleClickToEdit}
            >
              {content}
            </label>
          </div>
          <Button
            aria-label="Close"
            onClick={handleDeleteTodoItem}
            className="todo-item__delete"
            data-testid="todo-item-delete"
          >
            <IoTrashBin fontSize={24} color="#F22257" />
          </Button>
        </>
      )}
    </div>
  );
};

export default memo(TodoItem);
