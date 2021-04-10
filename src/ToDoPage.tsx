import React, { useEffect, useReducer, useRef, useState } from "react";
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
import { TodoStatus, Todo } from "./models/todo";
import { isTodoCompleted } from "./utils";
import { Card, Popup, Input } from "./components/UI/index";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const [togglePopup, setTogglePopup] = useState<boolean>(false);
  const [todoEdit, setTodoEdit] = useState<Todo | null>(null);

  useEffect(() => {
    (async () => {
      const resp = (await Service.getTodos()) ?? [];
      dispatch(setTodos(resp || []));
    })();
  }, [togglePopup]);

  const onCreateTodo = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    inputRef: any
  ) => {
    console.log("eee", e);
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
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const onTogglePopup = (
    event: React.ChangeEvent<HTMLInputElement>,
    todo: Todo
  ) => {
    if (todo) {
      setTodoEdit(todo);
    }
    setTogglePopup(!togglePopup);
  };

  const showTodos = todos.filter((todo) => {
    console.log("showing", showing);
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });
  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  const deleteTodoFunc = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  return (
    <div className="ToDo__container">
      <h1>Mana Todo</h1>
      <Popup
        todolist={showTodos}
        isToggle={togglePopup}
        onTogglePopup={onTogglePopup}
        todoEdit={todoEdit}
      />

      <Input onCreateTodo={onCreateTodo} />
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
            className={`Action__btn ${showing === "ALL" ? "active all" : ""} `}
            onClick={() => setShowing("ALL")}
          >
            All
          </button>
          <button
            className={`Action__btn ${
              showing === TodoStatus.ACTIVE
                ? "active " + TodoStatus.ACTIVE.toLowerCase()
                : ""
            } `}
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className={`Action__btn ${
              showing === TodoStatus.COMPLETED
                ? "active " + TodoStatus.COMPLETED.toLowerCase()
                : ""
            } `}
            onClick={() => setShowing(TodoStatus.COMPLETED)}
          >
            Completed
          </button>
          <button className={`Action__btn `} onClick={onDeleteAllTodo}>
            Clear all todos
          </button>
        </div>
      </div>
      <Card
        todoList={showTodos}
        onUpdateTodoStatus={onUpdateTodoStatus}
        deleteTodo={deleteTodoFunc}
        onTogglePopup={onTogglePopup}
      />
    </div>
  );
};

export default ToDoPage;
