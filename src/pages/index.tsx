import React, { useEffect, useReducer, useRef, useState } from "react";
import "./todo.css";

import reducer, { initialState } from "../store/reducer";
import {
  setTodo,
  createTodo,
  deleteTodo,
  toggleAllTodo,
  clearTodoList,
  updateTodoStatus,
  updateTodo,
} from "../store/actions";
import Service from "../service";
import { TodoStatus } from "../constants/todo";
import LocalStorage from "../localStorage";
import TodoAction from "./TodoAction";
import TodoList from "./TodoList";

const ToDo = () => {
  const [{ todoList }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<TodoStatus>(TodoStatus.ALL);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodoList();
      dispatch(setTodo(resp || []));
    })();
  }, []);

  useEffect(() => {
    LocalStorage.updateToDoToLocalStorage(todoList);
  }, [todoList]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
      inputRef.current.value = "";
    }
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodo(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(clearTodoList());
  };

  const getTodoByStatus = () => {
    if (showing === TodoStatus.ALL) {
      return todoList;
    } else {
      return todoList.filter((todo) => {
        return todo.status === showing;
      });
    }
  };

  const handleDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  const handleUpdateTodo = (todoId: string, content: string) => {
    dispatch(updateTodo(todoId, content));
  };

  return (
    <div className="todo__container" data-test="todo-container">
      <div className="todo__creation">
        <input
          ref={inputRef}
          className="todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      <TodoList
        todoList={getTodoByStatus()}
        onUpdateTodoStatus={onUpdateTodoStatus}
        handleUpdateTodo={handleUpdateTodo}
        handleDeleteTodo={handleDeleteTodo}
      />
      <TodoAction
        todoList={todoList}
        onToggleAllTodo={onToggleAllTodo}
        setShowing={setShowing}
        onDeleteAllTodo={onDeleteAllTodo}
      />
    </div>
  );
};

export default ToDo;
