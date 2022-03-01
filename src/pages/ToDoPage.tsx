import React from "react";

import AddTodo from "../components/AddTodo";
import TodoControl from "../components/TodoControl";
import TodoList from "../components/TodoList";

const ToDoPage = () => {
  return (
    <div className="ToDo__container">
      <AddTodo />
      <TodoList />
      <TodoControl />
    </div>
  );
};

export default ToDoPage;
