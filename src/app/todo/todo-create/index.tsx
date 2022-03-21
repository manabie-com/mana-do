import Input from "components/input";
import React, { useRef } from "react";
import useFilterTodoFacade from "../facades/useFilterTodoFacade";
import useTodoFacade from "../facades/useTodoFacade";
import { CreateTodoDto, TodoStatus } from "../todo.models";
import Styles from "./todo-create.module.scss";

const TodoCreate = () => {
  const { createTodo } = useTodoFacade();
  const { showStatus, setShowStatus } = useFilterTodoFacade();

  const inputRef = useRef<HTMLInputElement>(null);

  const onCreateTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = inputRef?.current && inputRef?.current?.value.trim();

    if (event.key === "Enter" && inputValue) {
      const createTodoDto: CreateTodoDto = {
        content: inputValue,
      };

      createTodo(createTodoDto);

      inputRef.current.value = "";

      if (showStatus === TodoStatus.COMPLETED) {
        setShowStatus(TodoStatus.ACTIVE);
      }
    }
  };

  return (
    <div className={Styles.Container}>
      <Input
        testId="create-todo-input"
        placeholder="What needs to be done?"
        onKeyDown={onCreateTodo}
        forwardedRef={inputRef}
      />
    </div>
  );
};

export default TodoCreate;
