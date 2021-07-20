import React from 'react';
import {GlobalContextType, StateContext} from "../../App";
import {TodoLoadingStatus, TodoStatus} from "../../models/todo";
import TodoListItems from "./TodoListItems";

const TodoList = () => {
  const {state: { todos, todosLoadStatus, filter: {status} }} = React.useContext<GlobalContextType>(StateContext);

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
