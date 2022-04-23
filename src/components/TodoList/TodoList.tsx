import React from "react";

import { Todo } from "types";
import TodoItem from "components/TodoItem";

type PropTypes = {
  todos: Todo[];
};

export default function TodoList({ todos = [] }: PropTypes): JSX.Element {
  return (
    <div data-testid="todo-list">
      {todos.map(({ id, completed, content }) => (
        <TodoItem key={id} id={id} content={content} isCompleted={completed} />
      ))}
    </div>
  );
}
