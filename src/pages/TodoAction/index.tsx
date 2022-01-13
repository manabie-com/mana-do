import Todo from "../../models/todo";
import React from "react";
import { TodoStatus } from "../../constants/todo";

interface TodoActionInterface {
  todoList: Array<Todo>; 
  onToggleAllTodo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShowing: (status: TodoStatus) => void;
  onDeleteAllTodo: () => void;
}

const TodoAction = (props: TodoActionInterface) => {
  const { todoList, onToggleAllTodo, setShowing, onDeleteAllTodo } =
    props;

  return (
    <div className="todo__toolbar">
      {todoList.length > 0 && (
        <input
          type="checkbox"
          checked={
            todoList.reduce(function (accum, todo) {
              return todo.isTodoCompleted() ? accum : accum + 1;
            }, 0) === 0
          }
          onChange={onToggleAllTodo}
        />
      )}
      <div className="todo__tabs">
        <button
          className="todo__tabs-btn"
          onClick={() => setShowing(TodoStatus.ALL)}
        >
          All
        </button>
        <button
          className="todo__tabs-btn"
          onClick={() => setShowing(TodoStatus.ACTIVE)}
        >
          Active
        </button>
        <button
          className="todo__tabs-btn"
          onClick={() => setShowing(TodoStatus.COMPLETED)}
        >
          Completed
        </button>
      </div>
      <button className="todo__tabs-btn" onClick={onDeleteAllTodo}>
        Clear all todos
      </button>
    </div>
  );
};

export default TodoAction;
