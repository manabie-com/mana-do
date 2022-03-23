import React, { useEffect, useReducer, useRef, useState } from "react";

import reducer, { initialState } from "./store/reducer";
import {
  setTodos,
  createTodo,
  toggleMultiTodos,
  deleteAllTodos,
  deleteTodo,
  updateTodoContent,
} from "./store/actions";
import Service from "./service";
import { Todo, TodoStatus } from "./models/todo";
import useClickOutside from "./hooks/useClickOutside";

const ToDoPage = () => {
  const inputRef = useRef<any>(null);
  const inputUpdateRef = useRef<any>(null);
  const [{ todos }, dispatch] = useReducer(reducer, initialState);

  const [listCheck, setListCheck] = useState<string[]>([]);
  const [isShowUpdate, setIsShowUpdate] = useClickOutside(inputUpdateRef);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
      inputRef.current.value = "";
    }
  };

  const onUpdateTodoContent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && selectedTodo) {
      dispatch(
        updateTodoContent(selectedTodo.id, inputUpdateRef.current.value)
      );
      setIsShowUpdate(false);
    }
  };

  const onCheckTodo = (todoId: string) => {
    let listTemp = [...listCheck];
    const index = listTemp.findIndex((item) => item === todoId);
    if (index > -1) {
      listTemp = listTemp.filter((item) => item !== todoId);
    } else {
      listTemp.push(todoId);
    }
    setListCheck(listTemp);
  };

  const onCheckAll = () => {
    if (todos.length === listCheck.length) {
      setListCheck([]);
    } else {
      setListCheck(todos.map((item) => item.id));
    }
  };

  const onDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  const onToggleMultiCheckTodo = (type: string) => {
    if (listCheck.length === 0) return;
    dispatch(toggleMultiTodos({ status: type, ids: listCheck }));
    setListCheck([]);
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const onDoubleClickTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsShowUpdate(true);
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
                checked={listCheck.includes(todo.id)}
                onChange={() => onCheckTodo(todo.id)}
              />
              {selectedTodo && selectedTodo.id === todo.id && isShowUpdate ? (
                <input
                  className="Todo__input"
                  ref={inputUpdateRef}
                  defaultValue={selectedTodo.content}
                  autoFocus
                  onKeyDown={onUpdateTodoContent}
                />
              ) : (
                <span onDoubleClick={() => onDoubleClickTodo(todo)}>
                  {todo.status === TodoStatus.COMPLETED ? (
                    <del>{todo.content}</del>
                  ) : (
                    todo.content
                  )}
                </span>
              )}
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
          <input
            type="checkbox"
            onChange={onCheckAll}
            checked={todos.length === listCheck.length}
          />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          {/* <button className="Action__btn">All</button> */}
          <button
            className="Action__btn"
            onClick={() => onToggleMultiCheckTodo(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className="Action__btn"
            onClick={() => onToggleMultiCheckTodo(TodoStatus.COMPLETED)}
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
