import "./List.css"

import React from "react";

/* Models */
import { EnhanceTodoStatus, Todo } from "src/models/todo";

/* Components */
import TodoItem from "src/components/List/Item";

type Props = {
  todos: Todo[];
  showing: EnhanceTodoStatus;
  handleUpdateTodo: (todo: Todo) => Promise<void>;
  clearErrorUpdate: () => void;
  errorUpdate: boolean;
  messageUpdate: string;
  handleDeleteTodo: (id: string) => Promise<void>;
};

const List = ({
  todos,
  showing,
  handleUpdateTodo,
  clearErrorUpdate,
  errorUpdate,
  messageUpdate,
  handleDeleteTodo,
}: Props) => {

  return (
    <div className="todo__list">
      {todos.reduce<JSX.Element[]>((prev, todo) => {
        if (showing === "ALL" || showing === todo.status) {
          prev.push(
            <TodoItem
              key={todo.id}
              todo={todo}
              handleUpdateTodo={handleUpdateTodo}
              clearErrorUpdate={clearErrorUpdate}
              errorUpdate={errorUpdate}
              messageUpdate={messageUpdate}
              handleDeleteTodo={handleDeleteTodo}
            />
          );
        }
        return prev;
      }, [])}
    </div>
  );
};

export default React.memo(List);
