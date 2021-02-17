import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { RouteComponentProps } from "react-router-dom";

import reducer, { initialState } from "../../store/reducer";
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
} from "../../store/actions";
import Service from "../../service";
import { TodoStatus } from "../../models/todo";
import { isTodoCompleted } from "../../utils";
import Item from "./Item";
import "./index.css";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<HTMLInputElement>(null);

  const loadData = useCallback(async () => {
    const resp = await Service.getTodos();
    dispatch(setTodos(resp));
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onCreateTodo = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputRef.current) {
        try {
          const resp = await Service.createTodo(inputRef.current.value);
          dispatch(createTodo(resp));
          inputRef.current.value = "";
        } catch (e) {
          if (e.response.status === 401) {
            history.push("/");
          }
        }
      }
    },
    [history]
  );

  const onUpdateTodoStatus = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
      dispatch(updateTodoStatus(todoId, e.target.checked));
    },
    []
  );

  const onToggleAllTodo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(toggleAllTodos(e.target.checked));
    },
    []
  );

  const onDeleteAllTodo = useCallback(() => {
    dispatch(deleteAllTodos());
  }, []);

  const showTodos = useMemo(
    () =>
      todos.filter((todo) => {
        switch (showing) {
          case TodoStatus.ACTIVE:
            return todo.status === TodoStatus.ACTIVE;
          case TodoStatus.COMPLETED:
            return todo.status === TodoStatus.COMPLETED;
          default:
            return true;
        }
      }),
    [showing, todos]
  );

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  return (
    <div className="form">
      <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
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
          <button
            className={`${showing === "ALL" && "active"}`}
            onClick={() => setShowing("ALL")}
          >
            All
          </button>
          <button
            className={`${showing === TodoStatus.ACTIVE && "active"}`}
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className={`${showing === TodoStatus.COMPLETED && "active"}`}
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
        {showTodos.map((todo, index) => {
          return (
            <div key={index}>
              <Item
                data={todo}
                onUpdateTodoStatus={onUpdateTodoStatus}
                dispatch={dispatch}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ToDoPage;
