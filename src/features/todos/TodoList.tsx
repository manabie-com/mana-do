import React from 'react';

import {TodoLoadingStatus, TodoStatus} from "../../models/todo";
import TodoListItems from "./TodoListItems";
import {useAppContext} from "../../AppContext";

const TodoList = () => {
  const {state: { todos, todosLoadStatus, filter: {status} }} = useAppContext();

  if (todosLoadStatus === TodoLoadingStatus.Loading) {
    return <div className="loader">Loading...</div>
  }

  const showTodos = todos.filter((todo) => {
    switch (status) {
      case TodoStatus.Active:
        return todo.status === TodoStatus.Active;
      case TodoStatus.Completed:
        return todo.status === TodoStatus.Completed;
      default:
        return true;
    }
  });
  const renderedListItems = showTodos.map(todo => <TodoListItems key={todo.id} id={todo.id}/>);

  return <ul className="ToDo__list">{renderedListItems}</ul>
}

export default TodoList;
