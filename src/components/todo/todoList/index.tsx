import React, { useMemo } from "react";
import { useTodo } from "../../../hooks/useTodo";
import { filterTodoWithStatus } from "../../../utils";
import TodoItem from "../todoItem";
import "./todoList.scss";

const TodoList = (): JSX.Element => {
  const {
    state: { todos, showing },
  } = useTodo();
  const showTodos = useMemo(
    () => todos.filter((todo) => filterTodoWithStatus(todo, showing)),
    [todos, showing]
  );
  return (
    <div className="todo-list">
      {showTodos.map((todo, index) => {
        return <TodoItem key={index} todo={todo} />;
      })}
    </div>
  );
};

export default TodoList;
