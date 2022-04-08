import React, { useEffect, useReducer, useRef, useState } from "react";

import reducer, { initialState } from "./store/reducer";
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  deleteTodo,
  updateTodoContent,
} from "./store/actions";
import Service from "./service";
import { Todo, TodoStatus } from "./models/todo";
import Card from "./components/Card/Card";

export type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<any>(null);
  // Updated: create a state to store which Todo is editing
  const [currentEdit, setCurrentEdit] = useState<string>("");

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));

      // Updated: Reset input after create todo
      inputRef.current.value = "";
    }
  };

  // Updated: I change parameter into status in order to reused easily
  const onUpdateTodoStatus = (status: boolean, todoId: string) => {
    dispatch(updateTodoStatus(todoId, status));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  // Updated: implement onDeleteTodo function
  const onDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  const onEditTodo = (todoId: string, content: string) => {
    dispatch(updateTodoContent(todoId, content));
  };

  const changeEditMode = (todoId: string = "") => {
    setCurrentEdit(todoId);
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
        {/* Updated: I create a new component, named as Card, to control one todo */}
        {todos.map((todo: Todo) => (
          <Card
            key={todo.id}
            {...{
              ...todo,
              showing,
              onDeleteTodo,
              onUpdateTodoStatus,
              onEditTodo,
              changeEditMode,
              currentEdit,
              dispatch,
            }}
          />
        ))}
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <input type="checkbox" onChange={onToggleAllTodo} />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          <button className="Action__btn" onClick={() => setShowing("ALL")}>
            All
          </button>
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
