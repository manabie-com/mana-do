import React, { useEffect } from "react";
import useTodoFacade from "./facades/useTodoFacade";
import TodoCreate from "./todo-create";
import TodoItem from "./todo-item";
import TodoToolbar from "./todo-toolbar";
import Styles from "./todo.module.scss";

const ToDo = () => {
  const { todos, fetchTodos } = useTodoFacade();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className={Styles.Container}>
      <h1>Mana-DO</h1>

      <TodoCreate />

      <div data-testid="todo-list" className={Styles.List}>
        {todos.map((todo) => (
          <TodoItem testId={todo.id} key={todo.id} todo={todo} />
        ))}
      </div>

      <TodoToolbar />
    </div>
  );
};

export default ToDo;
