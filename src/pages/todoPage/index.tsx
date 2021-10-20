import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import { setTodos, createTodo } from "../../store/actions";
import Service from "../../service";
import TodoInput from "../../components/todo/todoInput";
import { Constants } from "../../constants";
import TodoList from "../../components/todo/todoList";
import TodoToolbar from "../../components/todo/todoToolbar";
import "./todoPage.scss";
import Heading from "../../components/heading";
import { AxiosError } from "axios";
import { useTodo } from "../../hooks/useTodo";

// we should move EnhanceTodoStatus to todo models for reuse
// type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = ({ history }: RouteComponentProps) => {
  // const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const {
    state: { todos },
    dispatch,
  } = useTodo();

  // I think we should add showing to reducer
  // const [showing, setShowing] = useState<EnhanceTodoStatus>(Constants.ALL);

  // I would use useState instead of useRef because I don't want to use forwardRef to pass ref
  // to children. Using useState would be simpler to pass value to children
  // const inputRef = useRef<HTMLInputElement>(null);
  const [todoText, setTodoText] = useState<string>("");

  useEffect(() => {
    // we should use try catch to handle error
    (async () => {
      try {
        const resp = await Service.getTodos();
        dispatch(setTodos(resp || []));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  // update todos in localstorage when todos have changed
  useEffect(() => {
    localStorage.setItem(Constants.TODOS, JSON.stringify(todos));
  }, [todos]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // we should add "enter" to constants
    if (e.key === Constants.ENTER && todoText) {
      try {
        const resp = await Service.createTodo(todoText);
        dispatch(createTodo(resp));
        setTodoText("");
      } catch (error) {
        // we should log the error here
        console.log(error);
        // fix issue "Object is of type 'unknown'"
        if ((error as AxiosError).response?.status === 401) {
          history.push("/");
        }
      }
    }
  };

  const onTodoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  };

  return (
    <div className="todo-page">
      <Heading text="Todos App" />
      <TodoInput
        value={todoText}
        placeholder="What need to be done?"
        onKeyDown={onCreateTodo}
        onChange={onTodoInputChange}
      />
      <TodoList />
      <TodoToolbar />
    </div>
  );
};

export default ToDoPage;
