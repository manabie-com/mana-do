import React, {
  useEffect,
  useReducer,
  useRef,
  useState,
  useCallback,
} from "react";
import { RouteComponentProps } from "react-router-dom";

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

import TodoItem from "./components/TodoItem";
import TodoInput from "./components/TodoInput";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, []);

  const handleCreateTodo = useCallback(async (content: string) => {
    try {
      const resp = await Service.createTodo(content);
      dispatch(createTodo(resp));
    } catch (error) {
      if ((error as any)?.response?.status === 401) {
        history.push("/");
      }
    }
  }, []);

  const handleUpdateTodoStatus = useCallback(
    (todoId: string, status: TodoStatus) => {
      dispatch(updateTodoStatus(todoId, status));
    },
    []
  );

  const handleDeleteTodo = useCallback(async (todoId: string) => {
    const todoIdDeleted = await Service.deleteTodo(todoId);
    if (todoIdDeleted) {
      dispatch(deleteTodo(todoIdDeleted));
    }
  }, []);

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const showTodos = todos.filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  return (
    <div className="ToDo__container">
      <div className="Todo__creation">
        <TodoInput
          clearTextWhenEnter
          className="Todo__input"
          placeholder="What need to be done?"
          onEnter={handleCreateTodo}
          content=""
        />
      </div>
      <div className="ToDo__list">
        {showTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              id={todo.id}
              onChange={handleUpdateTodoStatus}
              onDelete={handleDeleteTodo}
              content={todo.content}
              status={todo.status}
            />
          );
        })}
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
    </div>
  );
};

export default ToDoPage;
