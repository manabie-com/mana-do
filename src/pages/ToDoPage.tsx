import React from "react";

import { AddTodo, TodoControl, TodoList } from "../components";

const ToDoPage = () => {
  return (
    <div className="ToDo__container" data-testid="test">
      <AddTodo />
      <TodoList />
      <TodoControl />
    </div>
  );
};

export default ToDoPage;
