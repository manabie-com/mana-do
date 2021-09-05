import React, { useEffect, useReducer, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import reducer, { initialState } from "../store/reducer";
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodo,
} from "../store/actions";
import Service from "../service";
import { Todo, TodoStatus } from "../models/todo";
import { isTodoCompleted } from "../utils";
import ToDoList from "../components/ToDo/list";
import TodoTabs from "../components/ToDo/tabs";
import ToDoToolbar from "../components/ToDo/toolbar";
import ToDoSearch from "../components/ToDo/search";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const resp = await Service.getTodos();
      setLoading(false);

      dispatch(setTodos(resp || []));
    })();
  }, []);

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

  const onUpdateTodo = async (todo: Todo) => {
    const updateItem = todos.find((x) => x.id === todo.id);

    if (!updateItem) {
      return;
    }

    await Service.updateTodo(todo);
    dispatch(updateTodo(todo));
  };

  const onToggleAllTodo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const completed = e.target.checked
    await Service.toggleAll(!completed);
    dispatch(toggleAllTodos(completed));
  };

  const onDeleteAllTodo = async () => {
    await Service.deleteAll('uid');
    dispatch(deleteAllTodos());
  };

  const onDeleteTodo = async (todoId: string) => {
    await Service.deleteTodo(todoId);
    dispatch(deleteTodo(todoId));
  };

  const showTodos = todos.filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return [];
    }
  });

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  return (
    <div className="ToDo__container">
      <ToDoSearch onCreateTodo={onCreateTodo} inputRef={inputRef} />
      <TodoTabs setShowing={setShowing} todos={todos} />
      <ToDoToolbar
        activeTodos={activeTodos}
        todos={todos}
        onToggleAllTodo={(e) => onToggleAllTodo(e)}
        onDeleteAllTodo={onDeleteAllTodo}
      />
      {!loading ? (
        <ToDoList
          showTodos={showTodos}
          isTodoCompleted={isTodoCompleted}
          onUpdateTodo={onUpdateTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default ToDoPage;
