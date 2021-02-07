import React, { useEffect, useReducer, useRef, useState } from "react";
import reducer, { initialState } from "../store/reducer";
import {
  setTodos,
  createTodo,
  deleteTodo,
  // toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  updateTodoContent,
} from "../store/actions";
import Service from "../service";
import { TodoStatus } from "../models/todo";
// import { isTodoCompleted } from "../utils";
import Input from "../components/Input";
import TodoList from "../components/TodoList";
import HelmetTitle from "../components/Helmet";
import ErrorMessage from "../components/ErrorMessage";
import Toolbar from "../components/Toolbar";
import { isDuplicateContent } from "../utils/validate.utils";
import styled from "styled-components";

const TodoWrap = styled.div`
  width: 100vw;
  height: 100%;
  justify-content: center;
  display: flex;
  font-size: 1.2rem;

  .todo-list {
    width: 510px;
    padding: 2rem 1.5rem;
    background: white;
    box-shadow: 3px 3px 10px #eee;

    .section--add {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;

      .input-todo {
        padding: 0.7rem 1rem;
        border: none;
        border: 3px solid #333;
        flex-grow: 0.9;
      }

      button {
        font-size: 1rem;
        padding: 0.4rem 0.75rem;
        font-size: 1.4rem;
        background: transparent;
        border: 3px solid #333;
        box-shadow: 4px 4px #f50057;
        cursor: pointer;
        transform: 2s ease;

        &:active {
          position: relative;
          left: 4px;
          top: 4px;
          box-shadow: none;
          text-shadow: none;
        }
      }
    }
  }
`;

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

  const onCreateTodo = async (e: any) => {
    if (errorMessage.length > 0) {
      setErrorMessage("");
    }

    if (inputRef.current) {
      const valueInput = inputRef.current.value.trim();

      if (valueInput.length === 0) {
        setErrorMessage("Name todo can't be empty.");
      } else if (isDuplicateContent(valueInput, showTodos)) {
        setErrorMessage("Name todo can't be duplicate.");
      } else {
        const resp = await Service.createTodo(valueInput);
        dispatch(createTodo(resp));
        inputRef.current.value = "";
      }
    }
  };

  // const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch(toggleAllTodos(e.target.checked));
  // };

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

  // const activeTodos = todos.reduce(function (accum, todo) {
  //   return isTodoCompleted(todo) ? accum : accum + 1;
  // }, 0);

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
    <TodoWrap>
      <HelmetTitle title="Todo Page" />
      <div className="todo-list">
        <h1 style={{ marginBottom: 12 }}>To-Do List</h1>
        <Toolbar showing={showing} setShowing={setShowing} onDeleteAllTodo={onDeleteAllTodo} />
        <div className="section--add">
          <Input
            type="text"
            autoComplete="off"
            inputRef={inputRef}
            name="nameTodo"
            className="input-todo"
            placeholder="Add an item"
            onKeyDown={(e) => {
              if (e.key === "Enter") onCreateTodo(e);
            }}
            onBlur={onBlur}
          />
          <button type="button" onClick={onCreateTodo}>
            + Add
          </button>
        </div>

        <ErrorMessage message={errorMessage} className="" />

        <TodoList
          dataTodos={showTodos}
          onUpdateTodoStatus={onUpdateTodoStatus}
          onUpdateTodo={onUpdateTodo}
          onDeleteTodo={onDeleteTodo}
        />
      </div>
    </TodoWrap>
  );
};

export default ToDoPage;
