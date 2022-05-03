import React, {
  useEffect,
  useReducer,
  useRef,
  useState,
  KeyboardEvent,
} from "react";
import moment from "moment";

import reducer, { initialState } from "./store/reducer";
import {
  createTodo,
  updateTodoStatus,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoContent,
} from "./store/actions";
import Service from "./service";
import { TodoStatus } from "./store/models";
import { DateFormat } from "./constant/app";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const [editItemIndex, setEditItemIndex] = useState<number>(-1);
  const [editItemContent, setEditItemContent] = useState<string>("");
  const inputRef = useRef<any>(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputRef.current.value.trim() !== "" && e.key === "Enter") {
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

  const onEditTodoContent = (e: KeyboardEvent, id: string) => {
    if (e.key === "Enter") {
      dispatch(updateTodoContent(id, editItemContent));
      setEditItemIndex(-1);
    }
  };

  const onDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
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
          data-testid="todo__input"
          type="text"
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className="ToDo__list">
        {todos.map((todo, index) => {
          if (todo.status === showing || showing === "ALL") {
            return (
              <div key={index} className="ToDo__item">
                <input
                  type="checkbox"
                  checked={todo.status === TodoStatus.COMPLETED ? true : false}
                  onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                />
                {editItemIndex === index ? (
                  <input
                    type="text"
                    autoFocus
                    onKeyDown={(e) => onEditTodoContent(e, todo.id)}
                    onChange={(e) => setEditItemContent(e.target.value)}
                    onBlur={() => setEditItemIndex(-1)}
                    className="edit-input"
                    placeholder="editing"
                  />
                ) : (
                  <>
                    <span onDoubleClick={() => setEditItemIndex(index)}>
                      {todo.content}
                    </span>
                    <span>{moment(todo.created_date).format(DateFormat)}</span>
                    <span>{todo.user_id}</span>
                  </>
                )}
                <button
                  onClick={() => onDeleteTodo(todo.id)}
                  className="Todo__delete"
                >
                  X
                </button>
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <input
            data-testid="toggle__all"
            type="checkbox"
            onChange={onToggleAllTodo}
          />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          <button
            className="Action__btn all__btn"
            onClick={() => setShowing("ALL")}
          >
            All
          </button>
          <button
            className="Action__btn active__btn"
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className="Action__btn completed__btn"
            onClick={() => setShowing(TodoStatus.COMPLETED)}
          >
            Completed
          </button>
        </div>
        <button className="Action__btn clear__btn" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;
