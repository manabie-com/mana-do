import React, { useEffect, useReducer, useRef, useState } from "react";

import reducer, { initialState } from "./store/reducer";
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  deleteTodo,
  updateTodo,
  todoActive,
  todoComplete,
} from "./store/actions";
import Service from "./service";
import { TodoStatus } from "./models/todo";


const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputRef.current.value.length > 0) {
        const resp = await Service.createTodo(inputRef.current.value.trim());
        dispatch(createTodo(resp));
        localStorage.setItem("todo-app", JSON.stringify([...todos, resp]));
        onResetInput();
      } else alert("Please input your task");
    }
  };

  const onResetInput = () => {
    inputRef.current.value = "";
  };

  const onUpdateTodoStatus = ( e: React.ChangeEvent<HTMLInputElement>, todoId: any ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const onDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };
  
  const onUpdateTodo = ( e: React.ChangeEvent<HTMLInputElement>, todoId: string ) => {
    dispatch(updateTodo(e.target.value, todoId));
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
        {todos.map((todo, index) => {
          return (
            <div key={index} className="ToDo__item" >
              <input
                type="checkbox"
                checked={todo.status === TodoStatus.COMPLETED}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              <input
                type="text"
                value={todo.content}
                onChange={(e) => onUpdateTodo(e, todo.id)}
                className={`${todo.status === TodoStatus.COMPLETED && 'Todo__done'}`}
              />

              <button
                className="Todo__delete"
                onClick={() => onDeleteTodo(todo.id)}
              >
                X
              </button>
            </div>
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
          <button className="Action__btn" onClick={() => dispatch(setTodos(todos))}>
            All
          </button>
          <button
            className="Action__btn"
            onClick={() => dispatch(todoActive(TodoStatus.ACTIVE))}
          >
            Active
          </button>
          <button
            className="Action__btn"
            onClick={() => dispatch(todoComplete(TodoStatus.COMPLETED))}
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
