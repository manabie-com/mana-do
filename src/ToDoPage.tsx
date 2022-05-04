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
} from "./store/actions";
import Service from "./service";
import { TodoStatus } from "./models/todo";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<any>(null);

  // useEffect(() => {
  //   (async () => {
  //     const resp = await Service.getTodos();

  //     dispatch(setTodos(resp || []));
  //   })();
  // }, []);
  useEffect(() => {
    const get_todos_local_storage: any = localStorage.getItem("todos");
    const parse_todos: any = JSON.parse(get_todos_local_storage);
    dispatch(setTodos(parse_todos));
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
      inputRef.current.value = ""; // ** To remove input after pressing enter
    }
  };

  const onDeleteTodo = async (todoId: string) => {
    dispatch(deleteTodo(todoId)); // ** send the ID to delete the todo
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: any
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onEditTodo = (e: React.FormEvent<HTMLSpanElement>, todoId: string) => {
    dispatch(updateTodo(todoId, e.currentTarget.textContent));

    console.log(e.currentTarget.textContent);
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
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
            <div key={index} className="ToDo__item">
              <input
                type="checkbox"
                checked={showing === todo.status}
                onChange={(e) => onUpdateTodoStatus(e, todo?.id ?? "")}
              />
              <span
                contentEditable
                onInput={(e) => onEditTodo(e, todo?.id ?? "")}
              >
                {todo.content}
              </span>
              <button
                onClick={() => onDeleteTodo(todo.id)}
                className="Todo__delete"
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
