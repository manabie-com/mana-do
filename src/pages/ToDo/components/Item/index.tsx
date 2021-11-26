import React from "react";
import * as uuid from "uuid";
import Button from "../../../../components/Forms/Button";
import Input from "../../../../components/Forms/Input";
import { isTodoCompleted } from "../../../../utils";

function TodoItem(props: any) {
  const { todo, onUpdateTodoStatus, onDeleteTodo } = props;

  return (
    <div key={uuid.v4()} className="ToDo__item">
      <Input
        type="checkbox"
        checked={isTodoCompleted(todo)}
        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
      />
      <span>{todo.content}</span>
      <Button
        className="Todo__delete"
        title="X"
        onClick={() => onDeleteTodo(todo.id)}
      />
    </div>
  );
}

export default TodoItem;
