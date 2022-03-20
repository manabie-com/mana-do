import Input from "components/input";
import useOnClickOutside from "hooks/useOnClickOutside";
import React, { ChangeEvent, ComponentPropsWithoutRef, Fragment, useEffect, useRef, useState } from "react";
import useTodoStore from "../store/useTodoStore";
import { DeleteTodoDto, Todo, TodoStatus, UpdateTodoDto } from "../todo.models";
import removeIcon from "assets/remove.svg";
import Styles from "./todo-item.module.scss";

export type TodoItemProps = {
  todo: Todo;
} & ComponentPropsWithoutRef<"div">;

const TodoItem = ({ todo, ...props }: TodoItemProps) => {
  const { showStatus, updateTodo, deleteTodo } = useTodoStore((state) => state);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const editItemRef = useRef<HTMLInputElement>(null);
  useOnClickOutside(editItemRef, () => setIsEdit(false));

  useEffect(() => {
    if (isEdit === true) {
      editItemRef.current?.focus();
    }
  }, [isEdit]);

  const onUpdateTodoStatus = (event: ChangeEvent<HTMLInputElement>) => {
    const updateTodoDto: UpdateTodoDto = {
      id: todo.id,
      status: event.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
    };

    updateTodo(updateTodoDto);
  };

  const onEnableEditItem = () => {
    if (todo.status !== TodoStatus.COMPLETED) {
      setIsEdit(true);
    }
  };

  const onEditTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const editedValue = editItemRef?.current && editItemRef?.current?.value.trim();

    if (event.key === "Enter" && editedValue) {
      const updateTodoDto: UpdateTodoDto = {
        id: todo.id,
        content: editedValue,
      };

      updateTodo(updateTodoDto);
      setIsEdit(false);
    }

    if (event.key === "Escape") {
      setIsEdit(false);
    }
  };

  const onDeleteTodo = () => {
    const deleteTodoDto: DeleteTodoDto = {
      id: todo.id,
    };
    deleteTodo(deleteTodoDto);
  };

  return showStatus === todo.status || showStatus === TodoStatus.ALL ? (
    <div className={Styles.Container} {...props}>
      <Input
        testId="todo-item-checkbox"
        type="checkbox"
        variant="secondary"
        checked={todo.status === TodoStatus.COMPLETED}
        onChange={onUpdateTodoStatus}
      />
      {isEdit && todo.status !== TodoStatus.COMPLETED ? (
        <Input testId="edit-todo-input" defaultValue={todo.content} forwardedRef={editItemRef} onKeyDown={onEditTodo} />
      ) : (
        <div>
          <span data-testid="todo-item" todo-status={todo.status} onDoubleClick={onEnableEditItem}>
            {todo.content}
          </span>
          <time data-testid="todo-item-time">{new Date(todo.updated_date).toLocaleString()}</time>
        </div>
      )}
      <img src={removeIcon} alt="remove-item" onClick={onDeleteTodo} />
    </div>
  ) : (
    <Fragment></Fragment>
  );
};

export default TodoItem;
