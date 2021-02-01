import React, { useEffect, useReducer, useRef, useState } from "react";

import reducer, { initialState } from "../store/reducer";
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
import Input from "../components/Input";
import TodoList from "../components/TodoList";
import HelmetTitle from "../components/Helmet";
import ErrorMessage from "../components/ErrorMessage";
import Toolbar from "../components/Toolbar";
import { isDuplicateContent } from "../utils/validate.utils";

const ToDoPage: React.FC<any> = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<TodoStatus>(TodoStatus.ALL);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (errorMessage.length > 0) {
      setErrorMessage("");
    }

    if (e.key === "Enter" && inputRef.current) {
      const valueInput = inputRef.current.value.trim();

      if (valueInput.length === 0) {
        setErrorMessage("Name todo not be empty.");
      } else if (isDuplicateContent(valueInput, showTodos)) {
        setErrorMessage("Name todo not be duplicate.");
      } else {
        const resp = await Service.createTodo(valueInput);
        dispatch(createTodo(resp));
        inputRef.current.value = "";
      }
    }
  };

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

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    dispatch(updateTodoStatus(value, checked));
  };

  const onDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  const onUpdateTodo = (todoId: string, newContent: string) => {
    dispatch(updateTodoContent(todoId, newContent));
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (errorMessage.length > 0) {
      setErrorMessage("");
    }
  };

  return (
    <div className="ToDo__container">
      <HelmetTitle title="Todo Page" />
      <div className="Todo__creation">
        <Input
          autoComplete="off"
          inputRef={inputRef}
          name="nameTodo"
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
          onBlur={onBlur}
        />
        <ErrorMessage message={errorMessage} className="Todo__ErrorMessage" />
      </div>
      <TodoList
        dataTodos={showTodos}
        onUpdateTodoStatus={onUpdateTodoStatus}
        onUpdateTodo={onUpdateTodo}
        onDeleteTodo={onDeleteTodo}
      />
      {todos.length > 0 && (
        <div className="Todo__toolbar">
          <div className="Todo__CompleteAll">
            <div className="mb-10 ">Complete all</div>
            <Input
              name="checkAll"
              type="checkbox"
              valueWidth="20px"
              checked={activeTodos === 0}
              onChange={onToggleAllTodo}
            />
          </div>
          <Toolbar
            showing={showing}
            setShowing={setShowing}
            onDeleteAllTodo={onDeleteAllTodo}
          />
        </div>
      )}
    </div>
  );
};

export default ToDoPage;
