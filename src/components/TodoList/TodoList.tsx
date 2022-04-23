import TodoItem from "components/TodoItem";
import React from "react";

const fakeTodos = [
  {
    key: 1,
    content: "Feed the cat",
    completed: true,
  },
  {
    key: 2,
    content: "Feed the cat 2",
    completed: false,
  },
  {
    key: 3,
    content: "Feed the cat 3",
    completed: false,
  },
];

export default function TodoList({ todos = [] }): JSX.Element {
  return (
    <div className="ToDo__list" data-testid="todo-list">
      {fakeTodos.map(({ key, completed, content }) => (
        <TodoItem key={key} content={content} isCompleted={completed} />
      ))}
    </div>
  );
}
