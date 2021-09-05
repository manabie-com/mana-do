import React, { FunctionComponent } from "react";
import { Todo } from "../../models/todo";
import ToDoItem from "./item";

interface Props {
  showTodos: Todo[];
  isTodoCompleted: (todo: Todo) => boolean;
  onUpdateTodo: (todo: Todo) => void;
  onDeleteTodo: (todoId: string) => void;
}

const ToDoList: FunctionComponent<Props> = ({
  showTodos,
  isTodoCompleted,
  onUpdateTodo,
  onDeleteTodo,
}) => {
  return (
    <div className="ToDo__list">
      {showTodos.length > 0 ? (
        showTodos.map((todo, index) => {
          return (
            <ToDoItem
              key={`todo-item-${index}`}
              todo={todo}
              isTodoCompleted={isTodoCompleted}
              onUpdateTodo={onUpdateTodo}
              onDeleteTodo={onDeleteTodo}
            />
          );
        })
      ) : (
        <div>Empty</div>
      )}
    </div>
  );
};

export default ToDoList;
