import React, { useEffect, useReducer, useRef, useState, memo } from "react";

import reducer, { initialState } from "store/reducer";
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
} from "store/actions";
import Service from "service";
import { TodoStatus } from "models/todo";
import { ToDoWrapper } from "./ToDo.styles";
import { isTodoCompleted } from "utils";
import { Todo, Footer } from "components";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = memo(() => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const [toggle, setToggle] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      const resp = await Service.createTodo(inputRef.current.value);

      dispatch(createTodo(resp));
      inputRef.current.value = "";
    }
  };

  const onToggleAllTodo = () => {
    setToggle((prev) => !prev);
    dispatch(toggleAllTodos(toggle));
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
    <ToDoWrapper>
      <div className="title">
        <h1>Todos</h1>
      </div>
      <div className="ToDo__container">
        <div className="Todo__creation">
          <input
            ref={inputRef}
            className="Todo__input"
            placeholder="What need to be done?"
            onKeyDown={onCreateTodo}
          />
        </div>
        <input
          className="Todo__toggle-all"
          type="checkbox"
          checked={activeTodos === 0}
          onChange={() => {
            onToggleAllTodo();
          }}
        />
        <label htmlFor="Todo__toggle-all" onClick={onToggleAllTodo}></label>
        <ul className="ToDo__list">
          {showTodos.map((todo, index) => {
            return <Todo index={index} todo={todo} dispatch={dispatch} />;
          })}
        </ul>
        <Footer
          showing={showing}
          todos={todos}
          activeTodos={activeTodos}
          setShowing={setShowing}
          onDeleteAllTodo={onDeleteAllTodo}
          onToggleAllTodo={onToggleAllTodo}
        />
      </div>
    </ToDoWrapper>
  );
});

export default ToDoPage;
