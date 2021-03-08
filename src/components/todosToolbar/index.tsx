import React, { useContext } from "react";
import { TodosContext } from "../../context";
import { Todo, TodoStatus } from "../../models/todo";
import { setShowing } from "../../store/actions";
import CheckBox from "../checkbox";
import "./todosToolbar.css";

interface ITodoToolbar {
  todos: Array<Todo> | undefined;
  activeTodos: number | undefined;
  onToggleAllTodo: React.ChangeEventHandler;
  onDeleteAllTodo: React.MouseEventHandler;
}

const TodoToolbar: React.FC<ITodoToolbar> = ({
  todos,
  activeTodos,
  onToggleAllTodo,
  onDeleteAllTodo,
}) => {
  const { todosDispatch } = useContext(TodosContext);

  return (
    <div className="todo__toolbar">
      <div className="todo__tabs">
        {Array.isArray(todos) && todos.length > 0 && (
          <CheckBox checked={activeTodos === 0} onChange={onToggleAllTodo} />
        )}

        <button
          className="action__btn"
          onClick={() => todosDispatch?.(setShowing("ALL"))}
        >
          All
        </button>
        <button
          className="action__btn"
          onClick={() => todosDispatch?.(setShowing(TodoStatus.ACTIVE))}
        >
          Active
        </button>
        <button
          className="action__btn"
          onClick={() => todosDispatch?.(setShowing(TodoStatus.COMPLETED))}
        >
          Completed
        </button>
      </div>
      <button className="action__btn" onClick={onDeleteAllTodo}>
        Clear all todos
      </button>
    </div>
  );
};

export default TodoToolbar;
