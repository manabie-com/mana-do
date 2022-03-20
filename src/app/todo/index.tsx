import React, { useEffect } from "react";
import useTodoStore from "./store/useTodoStore";
import TodoCreate from "./todo-create";
import TodoItem from "./todo-item";
import TodoToolbar from "./todo-toolbar";
import Styles from "./todo.module.scss";

const ToDo = () => {
  const { todos, fetchTodos, toggleAllTodos, deleteAllTodos, setShowStatus } = useTodoStore((state) => state);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className={Styles.Container}>
      <h1>Mana-DO</h1>

      <TodoCreate />

      <div className={Styles.List}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>

      <TodoToolbar toggleAllTodos={toggleAllTodos} deleteAllTodos={deleteAllTodos} setShowStatus={setShowStatus} />
    </div>
  );
};

export default ToDo;
