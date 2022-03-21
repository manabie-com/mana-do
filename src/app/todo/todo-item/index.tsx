import removeIcon from "assets/remove.svg";
import Input from "components/input";
import useOnClickOutside from "hooks/useOnClickOutside";
import React, { ChangeEvent, ComponentPropsWithoutRef, Fragment, useEffect, useRef, useState } from "react";
import useFilterTodoFacade from "../facades/useFilterTodoFacade";
import useTodoFacade from "../facades/useTodoFacade";
import { DeleteTodoDto, Todo, TodoStatus, UpdateTodoDto } from "../todo.models";
import Styles from "./todo-item.module.scss";

export type TodoItemProps = {
  testId: string;
  todo: Todo;
} & ComponentPropsWithoutRef<"div">;

const TodoItem = ({ testId, todo, ...props }: TodoItemProps) => {
  const { updateTodo, deleteTodo } = useTodoFacade();
  const { showStatus } = useFilterTodoFacade();

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
    <div data-testid={testId} className={Styles.Container} todo-status={todo.status} {...props}>
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
      <img data-testid="delete-todo-item-icon" src={removeIcon} alt="delete-item" onClick={onDeleteTodo} />
    </div>
  ) : (
    <Fragment></Fragment>
  );
};

export default TodoItem;
