import React from "react";
import Button from "../../../../components/Forms/Button";
import { Todo } from "../../../../models/todo";
import { isTodoCompleted } from "../../../../utils";
import ToDoToolbarTabs from "./Tabs";

function ToDoToolbar(props: any) {
  const { todos, onToggleAllTodo, setShowing, onDeleteAllTodo } = props;

  const activeTodos = todos.reduce(function (accum: number, todo: Todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);
  return (
    <div className="Todo__toolbar">
      {todos.length > 0 ? (
        <input
          type="checkbox"
          checked={activeTodos === 0}
          onChange={onToggleAllTodo}
        />
      ) : (
        <div />
      )}
      <ToDoToolbarTabs setShowing={setShowing} />
      <Button
        className="Action__btn"
        title="Clear all todos"
        onClick={onDeleteAllTodo}
      />
    </div>
  );
}

export default ToDoToolbar;
