import React from "react";
import { Todo } from "../models/todo";

import "../styles/todoList.scss";
import ToDoListItem from "./TodoListItem";

type TodoListProps = {
  dataSource: Todo[];
  onDelete: Function;
  onUpdate: Function;
};

const ToDoList = ({ dataSource, onDelete, onUpdate }: TodoListProps) => {
  // Display list of todo
  const renderTodoItems = dataSource.map((todo) => {
    return (
      <ToDoListItem
        key={todo.id}
        dataSource={todo}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    );
  });

  return <div className="todo__list">{renderTodoItems}</div>;
};

export default ToDoList;
