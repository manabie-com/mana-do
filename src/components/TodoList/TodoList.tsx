import React from "react";

import { Todo } from "types";
import TodoItem from "components/TodoItem";

type PropTypes = {
  todos: Todo[];
  dispatch: any;
};

export default function TodoList({
  todos = [],
  dispatch,
}: PropTypes): JSX.Element {
  return (
    <div data-testid="todo-list">
      {todos.map(({ id, completed, content }) => (
        <TodoItem
          key={id}
          id={id}
          content={content}
          isCompleted={completed}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
}
