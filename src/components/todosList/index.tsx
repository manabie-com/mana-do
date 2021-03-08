import React from "react";
import { Todo } from "../../models/todo";
import { AppActions } from "../../store/actions";
import TodoItem from "../todoItem";
import "./todoList.css";

interface ITodosList {
  showTodos: Array<Todo> | undefined;
  onUpdateTodoStatus: Function;
  todosDispatch: React.Dispatch<AppActions> | undefined;
}

const TodosList: React.FC<ITodosList> = ({
  showTodos,
  onUpdateTodoStatus,
  todosDispatch,
}) => {
  return (
    <div className="todo__list">
      {showTodos?.map((todo: Todo, index) => {
        return (
          <TodoItem
            key={index}
            {...{ todo, onUpdateTodoStatus, todosDispatch }}
          />
        );
      })}
    </div>
  );
};

export default TodosList;
