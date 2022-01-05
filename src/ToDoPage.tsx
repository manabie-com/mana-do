import React, { useEffect, useReducer, useState } from "react";

import reducer, { initialState } from "./store/reducer";
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
} from "./store/actions";
import Service from "./service";
import { TodoStatus } from "./models/todo";
import { isTodoCompleted } from "./utils";
import ToDoItem from "components/TodoItem";
import TodoInput from "components/TodoInput";
import { Todo } from "models/todo";

type EnhanceTodoStatus = TodoStatus | "ALL";

function filterTodos(type: EnhanceTodoStatus, todos: Todo[]) {
  return type === "ALL" ? todos : todos.filter((todo) => todo.status === type);
}

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showTodos, setShowTodos] = useState<Todo[]>(todos);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, []);

  useEffect(() => {
    const listTodo = filterTodos(showing, todos);
    setShowTodos(listTodo);
  }, [showing, todos]);

  const onCreateTodo = async (value: string) => {
    if (!value) return;
    const resp = await Service.createTodo(value);
    dispatch(createTodo(resp));
  };

  function onDeleteTodo(todoId: string) {
    dispatch(deleteTodo(todoId));
  }

  const onUpdateTodoStatus = (todoId: string, checked: boolean) => {
    dispatch(updateTodoStatus(todoId, checked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    Service.deleteAllTodos().then(() => {
      dispatch(deleteAllTodos());
    });
  };

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  return (
    <div className="ToDo__container">
      <div className="Todo__creation">
        <TodoInput onEnter={onCreateTodo} />
      </div>
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
        <div className="Todo__tabs">
          <button className="Action__btn" onClick={() => setShowing("ALL")}>
            All
          </button>
          <button
            className="Action__btn"
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className="Action__btn"
            onClick={() => setShowing(TodoStatus.COMPLETED)}
          >
            Completed
          </button>
        </div>
        <button className="Action__btn" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
      <div className="ToDo__list">
        {showTodos.map((todo, index) => (
          <ToDoItem
            key={`todo-item-${index}`}
            todo={todo}
            onUpdateStatus={onUpdateTodoStatus}
            onDelete={onDeleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default ToDoPage;
