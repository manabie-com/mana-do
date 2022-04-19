import * as React from "react";
import { TodoComponentProps, TodoStatus } from "../../models/todo";
import Service from "../../service";
import { deleteAllTodos, setTodos } from "../../store/actions";
import "./TodoToolbar.scss";

const TodoToolbar = ({ todos, dispatch }: TodoComponentProps) => {
  const onDeleteAllTodos = async () => {
    await Service.deleteAllTodos();
    dispatch(deleteAllTodos());
  };

  const isCompletedAll = todos.every((e) => e.status === TodoStatus.COMPLETED);

  const onToggleAllTodos = async () => {
    const toggleStatus = isCompletedAll
      ? TodoStatus.ACTIVE
      : TodoStatus.COMPLETED;
    const resp = await Service.toggleAllTodos(todos, toggleStatus);
    dispatch(setTodos(resp));
  };

  return (
    <div className="Todo__toolbar">
      <button
        className="Todo__toolbar_button Todo__toolbar_button--complete"
        onClick={onToggleAllTodos}
      >
        {isCompletedAll ? "Uncomplete All Items" : "Complete All Items"}
      </button>
      <button
        className="Todo__toolbar_button Todo__toolbar_button--delete"
        onClick={onDeleteAllTodos}
      >
        Delete All Items
      </button>
    </div>
  );
};

export default TodoToolbar;
