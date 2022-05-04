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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faPen,
  faFilter,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const [editMode, setEditMode] = useState<any>({});
  const [editingTitle, setEditingTitle] = useState<string>("");
  const inputRef = useRef<any>(null);

  useEffect(() => {
    Service.persistentTodos(todos);
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

  const onEnableEditMode = (todo: Todo) => {
    setEditingTitle(todo.content);
    setEditMode((curr: any) => {
      const clone = { ...curr };
      clone[todo.id] = true;
      return clone;
    });
  };

  const onDisableEditMode = (todoId: string) => {
    setEditMode((curr: any) => {
      const clone = { ...curr };
      clone[todoId] = false;
      return clone;
    });
  };

  const onKeydownTodo = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    todoId: string
  ) => {
    if (e.key === "Enter") {
      onUpdateTodoContent(todoId);
    }
  };

  const onUpdateTodoContent = (todoId: string) => {
    dispatch(updateTodoContent(todoId, editingTitle));
    onDisableEditMode(todoId);
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const onDeleteToDo = (todoId: any) => {
    dispatch(deleteTodo(todoId));
  };

  const showingByMode = React.useMemo(() => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todos.filter((i) => i.status === TodoStatus.ACTIVE);
      case TodoStatus.COMPLETED:
        return todos.filter((i) => i.status === TodoStatus.COMPLETED);
      default:
        return todos;
    }
  }, [todos, showing]);

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
        {todos.length > 0 ? (
          <input type="checkbox" onChange={onToggleAllTodo} />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          <FontAwesomeIcon className="Filter__icon" icon={faFilter} />
          <button
            className={`Action__btn ${showing === "ALL" ? "focus" : ""}`}
            onClick={() => setShowing("ALL")}
          >
            All
          </button>
          <button
            className={`Action__btn ${
              showing === TodoStatus.ACTIVE ? "focus" : ""
            }`}
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className={`Action__btn ${
              showing === TodoStatus.COMPLETED ? "focus" : ""
            }`}
            onClick={() => setShowing(TodoStatus.COMPLETED)}
          >
            Completed
          </button>
        </div>
        <button className="Clear__btn" onClick={onDeleteAllTodo}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      <div className="ToDo__list">
        {showingByMode.map((todo, index) => {
          return (
            <div
              key={index}
              className="ToDo__item"
              onDoubleClick={() => onEnableEditMode(todo)}
            >
              <input
                type="checkbox"
                checked={todo.status === TodoStatus.COMPLETED}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              {editMode[todo.id] ? (
                <input
                  className="Edit__input"
                  autoFocus={true}
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onBlur={() => onUpdateTodoContent(todo.id)}
                  onKeyDown={(e) => onKeydownTodo(e, todo.id)}
                />
              ) : (
                <span>{todo.content}</span>
              )}
              {/* <span>{todo.content}</span> */}

              <button
                className="Todo_action Todo__delete"
                onClick={() => onDeleteToDo(todo.id)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ToDoPage;
