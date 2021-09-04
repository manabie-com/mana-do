import React, { FunctionComponent } from "react";
import { Todo } from "../../models/todo";
import Button from "../common/button";
import Checkbox from "../common/inputs/checkbox";

interface Props {
  showTodos: Todo[];
  isTodoCompleted: (todo: Todo) => boolean;
  onUpdateTodoStatus: (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => void;
  onDeleteTodo: (todoId: string) => void;
}

const ToDoList: FunctionComponent<Props> = ({
  showTodos,
  isTodoCompleted,
  onUpdateTodoStatus,
  onDeleteTodo,
}) => {
  return (
    <div className="ToDo__list">
      {showTodos.length > 0 ? (
        showTodos.map((todo, index) => {
          return (
            <div key={`todo-item-${index}`} className="ToDo__item">
              <Checkbox
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              <span>{todo.content}</span>
              <Button
                className="Todo__delete"
                label="X"
                onClick={() => onDeleteTodo(todo.id)}
              />
            </div>
          );
        })
      ) : (
        <div>Empty</div>
      )}
    </div>
  );
};

export default ToDoList;
