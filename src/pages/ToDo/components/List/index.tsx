import React from "react";
import { showTodos } from "../../../../helpers/todos";
import { Todo } from "../../../../models/todo";
import TodoItem from "../Item";

function TodoList(props: any) {
  const { todos, showing, onUpdateTodoStatus, onDeleteTodo } = props;

  return (
    <div className="ToDo__list">
      {showTodos(todos, showing).map((todo: Todo, i: number) => {
        return (
          <TodoItem
            key={i}
            todo={todo}
            onUpdateTodoStatus={onUpdateTodoStatus}
            onDeleteTodo={onDeleteTodo}
          />
        );
      })}
    </div>
  );
}

export default TodoList;
