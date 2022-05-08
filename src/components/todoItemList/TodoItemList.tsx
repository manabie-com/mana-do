import { Todo } from "models";
import React, { Dispatch, FC, memo } from "react";
import { AppActions } from "store/actions";
import "./styles.scss";
import TodoItem from "./TodoItem/TodoItem";

interface ITodoItemListProps {
  todos: Array<Todo>;
  dispatch: Dispatch<AppActions>;
}

const TodoItemList: FC<ITodoItemListProps> = ({
  todos,
  dispatch,
  ...props
}) => {
  return (
    <div className="list-todo" {...props}>
      {todos.map((todo, index) => {
        return <TodoItem key={index} {...todo} dispatch={dispatch} />;
      })}
    </div>
  );
};

export default memo(TodoItemList);
