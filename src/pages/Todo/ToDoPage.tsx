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

import { STORAGE_TODO, Todo, TodoStatus } from "../../models/todo";

import Service from "../../service";
import { EnhanceTodoStatus } from "../../service/types";

import ToDoItem from "./ToDoItem";
import { getLocalStorage } from "../../utils/helpers";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>(TodoStatus.ALL);
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
    setTodosList(todos);
  }, [todos]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
    }
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: any
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
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
      <div className="ToDo__list">
        {todosList &&
          todosList.map((todo, index) => {
            return (
              <ToDoItem
                key={index}
                isShowing={showing}
                todo={todo}
                onUpdateTodoStatus={(e) => onUpdateTodoStatus(e, todo.id)}
                onDeleteTodo={() => onDeleteTodo(todo.id)}
              />
            );
          })}
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <input type="checkbox" onChange={onToggleAllTodo} />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          <button className="Action__btn">All</button>
          <button
            className="Action__btn"
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className="Action__btn"
            onClick={() => setShowing(TodoStatus.COMPLETED)}
          >
            Completed
          </button>
        </div>
        <button className="Action__btn" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;
