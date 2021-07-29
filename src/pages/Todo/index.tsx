import React, { useEffect, useReducer, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../../auth/useUser";
import { Button, Tags } from "../../components";

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

type EnhanceTodoStatus = TodoStatus | "ALL";

const FILTER_MAP = {
  All: () => true,
  Active: (task: any) => task.status === TodoStatus.ACTIVE,
  Completed: (task: any) => task.status === TodoStatus.COMPLETED,
} as any;

const FILTER_NAMES = Object.keys(FILTER_MAP);

function FilterButton(props: any) {
  return (
    <button
      type="button"
      className="btn btn__tags"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span>{props.name}</span>
    </button>
  );
}

const ToDoPage = () => {
  const history = useHistory();
  const user = useUser();
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // (async () => {
    //   const resp = await Service.getTodos();

    //   dispatch(setTodos(resp || []));
    // })();

    const loadTodos = async () => {
      try {
        const resp = await Service.getTodos();

        dispatch(setTodos(resp || []));
      } catch (error) {
        setErrorMessage(error);
      }
    };

    loadTodos();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      try {
        console.log("key enter===============>");
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
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const showTodos = todos.filter(FILTER_MAP[filter]);

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  return (
    <div className="content-container">
      <h1>TodoMatic for {user.name}</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyPress={onCreateTodo}
        />
      </div>
      <div className="ToDo__tagsList">{filterList}</div>
      <ul className="ToDo__list">
        {showTodos.map((todo, index) => {
          return (
            <div key={index} className="ToDo__item">
              <input
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              <span>{todo.content}</span>
              <button
                className="ToDo__delete"
                onClick={() => dispatch(deleteTodo(todo.id))}
              >
                &#215;
              </button>
            </div>
          );
        })}
      </ul>
      <div className="ToDo__toolbar">
        {todos.length > 0 ? (
          <label htmlFor="selectall" className="ToDo__selectall">
            <input
              name="selectall"
              id="selectall"
              type="checkbox"
              checked={activeTodos === 0}
              onChange={onToggleAllTodo}
            />
            <span>Complete all todos</span>
          </label>
        ) : null}

        <Button
          classNames="btn btn__danger"
          onClick={onDeleteAllTodo}
          text="Clear all todos"
        />
      </div>
    </div>
  );
};

export default ToDoPage;
