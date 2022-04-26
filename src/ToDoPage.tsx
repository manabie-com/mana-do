import React, { useEffect, useReducer, useRef, useState } from "react";

import reducer, { initialState } from "./store/reducer";
import {
  setTodos,
  createTodo,
  editTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  deleteTodo,
} from "./store/actions";
import Service from "./service";
import { TodoStatus } from "./models/todo";
import TodoItem from "./components/TodoItem";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  console.log("todos", todos);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!inputRef.current.value) return;
    if (e.key === "Enter") {
      const resp = await Service.createTodo(inputRef.current.value);

      dispatch(createTodo(resp));
    }
  };
  const onEditTodo = (id: string, content: string) => {
    dispatch(editTodo(id, content));
  };
  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: any
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };
  const onDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };
  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
  }
  return (
    <div className="ToDo__container">
      <h3>Doan The Duy - do assigment - Apply for Frontend position</h3>
      <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
          required
        />
      </div>
      <div className="ToDo__list">
        {todos && todos.length > 0 ? (
          <>
            {todos.map((todo, index) => {
              return (
                <div key={index}>
                  <TodoItem
                    todo={todo}
                    onDeleteTodo={onDeleteTodo}
                    onEditTodo={onEditTodo}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <>
            <span className="Empty__data__alert">Empty data</span>
          </>
        )}
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <>
            <input type="checkbox" onChange={onToggleAllTodo} />
            <span>Select all</span>
          </>
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
