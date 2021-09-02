import React, {
  createContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { isTodoCompleted } from "utils";
import reducer, { initialState } from "reducers/todoList";
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  TodoActions,
} from "actions/TodoListAction";
import { useHistory } from "react-router-dom";
import Service from "service";
import { TodoStatus } from "models/todo";

export type EnhanceTodoStatus = TodoStatus | "ALL";

type ToDoPageContextType = {
  dispatch: React.Dispatch<TodoActions>;
};

export const ToDoPageContext = createContext<ToDoPageContextType>(
  {} as ToDoPageContextType
);

export const EnhanceTodoStatusList: EnhanceTodoStatus[] = [
  ...Object.values(TodoStatus),
  "ALL",
];

const useTodo = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<HTMLInputElement>(null);

  const history = useHistory();
  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  // Save todo list to localStorage
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos));
  }, [todos]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current && inputRef.current.value) {
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

  return {
    todos,
    dispatch,
    setShowing,
    onCreateTodo,
    onToggleAllTodo,
    onDeleteAllTodo,
    showTodos,
    activeTodos,
    showing,
    inputRef,
  };
};

export default useTodo;
