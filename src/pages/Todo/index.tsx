import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../../auth/useUser";

import reducer, { initialState } from "../../store/reducer";
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  editTodoContent,
} from "../../store/actions";
import Service from "../../service";
import { TodoStatus } from "../../models/todo";
import { isTodoCompleted } from "../../utils";
import useReducerWithLocalStorage from "../../hooks/useReducerWithLocalStorage";
import TodoList from "./components/TodoList";
import TodoCreate from "./components/TodoCreate";
import TodoToolBar from "./components/TodoToolbar";

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

  // const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [filter, setFilter] = useState("All");
  const [{ todos }, dispatch] = useReducerWithLocalStorage({
    blacklist: ["status"],
    initializerArg: initialState,
    key: "REACT_APP_STATE",
    reducer,
  });
  // const [{ todos }, dispatch] = useReducer(reducer, initialState);
  console.log(todos);
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
  }, [dispatch]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  const showTodos = todos && todos.filter(FILTER_MAP[filter]);

  const activeTodos =
    todos &&
    todos.reduce(function (accum: any, todo: any) {
      return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTodo = (value: string, id: string) => {
    dispatch(editTodoContent(id, value));
  };

  return (
    <div className="content-container">
      <h1>TodoMatic for {user.name}</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <TodoCreate ref={inputRef} onCreateTodo={onCreateTodo} />
      <div className="ToDo__tagsList">{filterList}</div>
      <TodoList
        showTodos={showTodos}
        isTodoCompleted={isTodoCompleted}
        onUpdateTodoStatus={onUpdateTodoStatus}
        handleDeleteTodo={handleDeleteTodo}
        handleEditTodo={handleEditTodo}
      />
      <TodoToolBar
        todos={todos}
        activeTodos={activeTodos}
        onToggleAllTodo={onToggleAllTodo}
        onDeleteAllTodo={onDeleteAllTodo}
      />
    </div>
  );
};

export default ToDoPage;
