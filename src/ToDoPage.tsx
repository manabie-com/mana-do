import React, { useEffect, useReducer, useRef, useState, useMemo } from "react";

import reducer, { initialState } from "./store/reducer";
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  deleteTodo,
  updateTodoStatus,
  updateTodo,
} from "./store/actions";
import Service from "./service";
import { TodoStatus, Todo } from "./models/todo";
import { getTodoList } from "./utils/handleTodo";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const [targetTodo, setTargetTodo] = useState<Todo | null>(null);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      // const resp = await Service.getTodos();

      const todoListInLocal = getTodoList();
      dispatch(setTodos(todoListInLocal || []));
    })();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
    }
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: Todo["id"]
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const onUpdateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && targetTodo) {
      dispatch(updateTodo(targetTodo.id, targetTodo.content));
      setTargetTodo(null);
    }
  };

  const handleChangeTargetTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (targetTodo) {
      setTargetTodo({ ...targetTodo, content: e.target.value });
    }
  };

  const onDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  const filterTodos = useMemo(() => {
    if (showing === "ALL") {
      return todos;
    }
    return todos.filter((todo) => todo.status === showing);
  }, [showing, todos]);

  return (
    <div className="ToDo__container">
      <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className="ToDo__list">
        {filterTodos.map((todo) => {
          return (
            <div key={todo.id} className="ToDo__item">
              <input
                type="checkbox"
                checked={todo.status === TodoStatus["COMPLETED"]}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              {todo.id === targetTodo?.id ? (
                <input
                  className="Todo__input"
                  value={targetTodo.content}
                  onKeyDown={onUpdateTodo}
                  onChange={handleChangeTargetTodo}
                />
              ) : (
                <span onDoubleClick={() => setTargetTodo(todo)}>
                  {todo.content}
                </span>
              )}

              <button
                className="Todo__delete"
                onClick={() => onDeleteTodo(todo.id)}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <input type="checkbox" onChange={onToggleAllTodo} />
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
    </div>
  );
};

export default ToDoPage;
