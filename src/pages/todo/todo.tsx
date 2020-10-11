import React, { useEffect, useReducer, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import "./todo.scss";
import reducer from "../../store/reducer";
import {
  setTodos,
  createTodo,
  deleteTodo,
  deleteAllTodos,
  updateTodoStatus,
  updateTodo,
  AppActions,
} from "../../store/actions";
import Service from "../../services";
import { EnhanceTodoStatus, TodoStatus } from "../../models/todo";
import { getStateFromLocalStorage, isTodoCompleted } from "../../utils";
import Input from "src/components/input";
import Button from "src/components/button";
import TodoItem from "./components/item";
import { History } from "history";
import Toolbar from "./components/toolbar";

export const fetchTodoData = (dispatch: React.Dispatch<AppActions>) => () => {
  (async () => {
    const resp = await Service.getTodos();
    dispatch(setTodos(resp || []));
  })();
};

export const onCreateTodo = (
  history: History,
  dispatch: React.Dispatch<AppActions>
) => async (evt: React.KeyboardEvent<HTMLFormElement>) => {
  evt.preventDefault();
  const form = evt.target as HTMLFormElement;

  const formData = new FormData(form);
  const content = formData.get("content") as string;
  if (!content) return;
  form.reset();

  try {
    const resp = await Service.createTodo(content);
    dispatch(createTodo(resp));
  } catch (err) {
    if (err.response.status === 401) {
      history.push("/");
    }
  }
};

export const onDeleteAllTodo = (dispatch: React.Dispatch<AppActions>) => () => {
  dispatch(deleteAllTodos());
};

export const onChangeFilter = (
  setShowing: React.Dispatch<EnhanceTodoStatus>
) => (status: EnhanceTodoStatus) => {
  setShowing(status);
};

export const onUpdateTodoStatus = (dispatch: React.Dispatch<AppActions>) => (
  id: string,
  checked: boolean
) => {
  dispatch(updateTodoStatus(id, checked));
};

export const onUpdateTodo = (dispatch: React.Dispatch<AppActions>) => (
  id: string,
  content: string
) => {
  dispatch(updateTodo(id, content));
};

export const onDeleteTodoStatus = (dispatch: React.Dispatch<AppActions>) => (
  id: string
) => {
  dispatch(deleteTodo(id));
};

export const ToDo: React.FC<RouteComponentProps> = ({ history }) => {
  const [{ todos }, dispatch] = useReducer(reducer, getStateFromLocalStorage());
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");

  useEffect(fetchTodoData(dispatch), []);

  const handleCreateTodo = onCreateTodo(history, dispatch);
  const handleDeleteAllTodo = onDeleteAllTodo(dispatch);
  const handleChangeFilter = onChangeFilter(setShowing);
  const handleUpdateTodoStatus = onUpdateTodoStatus(dispatch);
  const handleUpdateTodo = onUpdateTodo(dispatch);
  const handleDeleteTodoStatus = onDeleteTodoStatus(dispatch);

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
  const completedTodos = todos.length - activeTodos;

  return (
    <div className="todo">
      <form className="form" onSubmit={handleCreateTodo}>
        <Input placeholder="What need to be done?" name="content" />
        <Input hidden type="submit" />
      </form>

      <Toolbar
        onChange={handleChangeFilter}
        totalTodos={todos.length}
        completedTodos={completedTodos}
        activeTodos={activeTodos}
        showing={showing}
      />

      <div className="mt-4 mb-2">
        {showTodos.map((todo, index) => (
          <TodoItem
            key={index}
            id={todo.id}
            content={todo.content}
            checked={todo.status === TodoStatus.COMPLETED}
            onUpdateStatus={handleUpdateTodoStatus}
            onUpdate={handleUpdateTodo}
            onDelete={handleDeleteTodoStatus}
          />
        ))}
      </div>

      <Button
        className="inline-block"
        variant="danger"
        onClick={handleDeleteAllTodo}
      >
        Clear all todos
      </Button>
    </div>
  );
};

export default ToDo;
