import React, { useEffect, useReducer, useRef, useState } from "react";

import {
  setTodos,
  createTodo,
  updateTodoStatus,
  toggleAllTodos,
  deleteAllTodos,
  deleteTodo,
} from "../../store/actions";
import reducer, { initialState } from "../../store/reducer";

import { STORAGE_TODO, TodoStatus } from "../../models/todo";

import Service from "../../service";
import { EnhanceTodoStatus } from "../../service/types";

import ToDoItem from "./ToDoItem";
import { getLocalStorage } from "../../utils/helpers";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [status, setStatus] = useState<EnhanceTodoStatus>(TodoStatus.ALL);
  const [todosList, setTodosList] = useState(todos);
  const inputRef = useRef<any>(null);

  const getTodos = () => {
    const todoStorage = getLocalStorage(STORAGE_TODO);
    const todosList = JSON.parse(todoStorage);
    dispatch(setTodos(todosList));
  };

  // Causes the function to be called only once
  useEffect(() => {
    getTodos();
  }, []);

  // Causes the function to be called every time the todosList changes
  useEffect(() => {
    setTodos(todos);
  }, [todos]);

  // Filter todos by status and set todosList to filtered todos
  useEffect(() => {
    setTodosList(
      todos.filter(
        (todo) => todo.status === status || status === TodoStatus.ALL
      )
    );
  }, [todos, status]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputRefValue = inputRef.current.value;
    if (e.key === "Enter" && inputRefValue) {
      const resp = await Service.createTodo(inputRefValue);
      dispatch(createTodo(resp));
      inputRef.current.value = "";
    }
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    dispatch(updateTodoStatus(id, e.target.checked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const onDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="ToDo__container">
      <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className="Todo__toolbar">
        <div className="Todo__tabs">
          <button
            className="Action__btn"
            onClick={() => setStatus(TodoStatus.ALL)}
          >
            All
          </button>
          <button
            className="Action__btn"
            onClick={() => setStatus(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className="Action__btn"
            onClick={() => setStatus(TodoStatus.COMPLETED)}
          >
            Completed
          </button>
        </div>
        <button className="Action__btn" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
      <div className="ToDo__list">
        {todosList &&
          todosList.map((todo, index) => {
            return (
              <ToDoItem
                key={index}
                todo={todo}
                onUpdateTodoStatus={(e) => onUpdateTodoStatus(e, todo.id)}
                onDeleteTodo={() => onDeleteTodo(todo.id)}
              />
            );
          })}
        {todosList.length === 0 && <div>No {status} todos</div>}
      </div>
    </div>
  );
};

export default ToDoPage;
