import React, { useEffect, useMemo } from "react";
import useFilterTodoFacade from "./facades/useFilterTodoFacade";
import useTodoFacade from "./facades/useTodoFacade";
import TodoCreate from "./todo-create";
import TodoEmpty from "./todo-empty";
import TodoItem from "./todo-item";
import TodoToolbar from "./todo-toolbar";
import { TodoStatus } from "./todo.models";
import Styles from "./todo.module.scss";

const ToDo = () => {
  const { todos, fetchTodos } = useTodoFacade();
  const { showStatus } = useFilterTodoFacade();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const filteredTodos = useMemo(
    () => todos.filter((todo) => showStatus === todo.status || showStatus === TodoStatus.ALL),
    [todos, showStatus]
  );

  return (
    <div className={Styles.Container}>
      <h1>Mana-DO</h1>

      <TodoCreate />

      <div data-testid="todo-list" className={Styles.List}>
        {filteredTodos.map((todo) => (
          <TodoItem testId={todo.id} key={todo.id} todo={todo} />
        ))}
        {Boolean(!filteredTodos.length) && <TodoEmpty emptyStatus={showStatus} />}
      </div>

      <TodoToolbar />
    </div>
  );
};

export default ToDo;
