import React, { useEffect, useReducer, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import reducer, { initialState } from "../../store/reducer";
import {
  setTodos,
  createTodo,
  deleteTodo,
  deleteAllTodos,
  updateTodoStatus,
  toggleAllTodos,
} from "../../store/actions";
import { isTodoCompleted } from "../../utils";
import Service from "../../service";
import { TodoStatus, Todo } from "../../models/todo";
import { Card, Popup, Input, Sort } from "../UI/index";
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

  const onTogglePopup = (event: any, todo: Todo) => {
    if (todo) {
      setTodoEdit(todo);
    }
    setTogglePopup(!togglePopup);
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

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const deleteTodoFunc = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  return (
    <div className="ToDo__container">
      <h1>Manabie Todo</h1>
      <Popup
        todolist={showTodos}
        isToggle={togglePopup}
        onTogglePopup={onTogglePopup}
        todoEdit={todoEdit}
      />
      <Input onCreateTodo={onCreateTodo} />
      <Sort
        showing={showing}
        setShowing={setShowing}
        onDeleteAllTodo={onDeleteAllTodo}
        onToggleAllTodo={onToggleAllTodo}
        activeTodos={activeTodos}
      />
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
