import React, { useEffect, useReducer, useRef, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";

import reducer, { initialState } from "./../store/reducer";
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  updateTodoContent,
} from "../store/actions";
import Service from "../service";
import { TodoStatus } from "../models/todo";
import { isTodoCompleted } from "../utils";
import Can from "../Auth/Can";
import { AuthConsumer } from "../Auth/authContext";
import ToDoItem from "./ToDoItem";

type EnhanceTodoStatus = TodoStatus | "ALL";

interface Props {}

const ToDoPage: React.FC<Props> = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      try {
        const resp = await Service.createTodo(inputRef.current.value);
        dispatch(createTodo(resp));
        inputRef.current.value = "";
      } catch (e) {}
    }
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = async () => {
    try {
      await Service.deleteAllTodos();
      dispatch(deleteAllTodos());
    } catch (e) {}
  };

  const onDeleteTodo = async (id: string) => {
    try {
      await Service.deleteTodo(id);
      dispatch(deleteTodo(id));
    } catch (e) {}
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
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className="ToDo__list">
        {showTodos.map((todo) => {
          return (
            <ToDoItem
              key={todo.id}
              todo={todo}
              onUpdateTodoStatus={onUpdateTodoStatus}
              onDeleteTodo={onDeleteTodo}
              onUpdateTodoContent={(id: string, content: string) =>
                dispatch(updateTodoContent(id, content))
              }
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

const ToDoPageWithCan: React.FC = () => (
  <AuthConsumer>
    {({ user }) => (
      <Can
        role={user.role}
        perform={"todo"}
        yes={() => <ToDoPage />}
        no={() => <Redirect to="/" />}
      />
    )}
  </AuthConsumer>
);

export default ToDoPageWithCan;
