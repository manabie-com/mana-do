import React, { useEffect, useReducer, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import reducer, { initialState } from "../../store/reducer";
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
} from "../../store/actions";
import Service from "../../service";
import { TodoStatus } from "../../models/todo";
import { isTodoCompleted } from "../../utils";
import TodoList from "./components/List";
import ToDoToolbar from "./components/Toolbar";
import RequireAuth from "../../components/Authorized";

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

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current?.value?.trim().length) {
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

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const onDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  return (
    <React.StrictMode>
      <RequireAuth>
        <div className="ToDo__container">
          <div className="Todo__creation">
            <input
              ref={inputRef}
              name="new-todo"
              className="Todo__input"
              placeholder="What need to be done?"
              onKeyDown={onCreateTodo}
            />
          </div>
          <TodoList
            todos={todos}
            showing={showing}
            onUpdateTodoStatus={onUpdateTodoStatus}
            onDeleteTodo={onDeleteTodo}
          />
          <ToDoToolbar
            todos={todos}
            onToggleAllTodo={onToggleAllTodo}
            setShowing={setShowing}
            onDeleteAllTodo={onDeleteAllTodo}
          />
        </div>
      </RequireAuth>
    </React.StrictMode>
  );
};

export default ToDoPage;
