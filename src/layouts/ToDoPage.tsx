import React, { useEffect, useReducer, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import reducer, { initialState } from "../store/reducer";
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  updateTodo,
} from "../store/actions";
import Service from "../service";
import { Todo, TodoStatus } from "../models/todo";
import { isTodoCompleted } from "../utils";
import TodoList from "../components/TodoList";
import FilterTodo from "../components/FilterTodo";
import AddTodo from "../components/AddTodo";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp));
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem("PersistStore", JSON.stringify(state.todos));
  }, [state]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      try {
        const resp = await Service.createTodo(inputRef.current.value);
        dispatch(createTodo(resp));
        inputRef.current.value = "";
      } catch (e) {
        if (e.response.status === 401) {
          history.push("/login");
        }
      }
    }
  };

  const onUpdateTodo = (todo: Todo) => {
    dispatch(updateTodo(todo));
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

  const onDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  return (
    <div className="todo_popup">
      <AddTodo inputRef={inputRef} onCreateTodo={onCreateTodo} />
      <TodoList
        todoList={state.todos}
        showing={showing}
        onToggleAllTodo={onToggleAllTodo}
        onUpdateTodoStatus={onUpdateTodoStatus}
        onUpdateTodo={onUpdateTodo}
        onDeleteTodo={onDeleteTodo}
        isTodoCompleted={isTodoCompleted}
      />
      <FilterTodo
        todoList={state.todos}
        showing={showing}
        setShowing={setShowing}
        onDeleteAllTodo={onDeleteAllTodo}
      />
    </div>
  );
};

export default ToDoPage;
