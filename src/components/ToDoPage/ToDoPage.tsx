import React, { useEffect, useReducer, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import reducer, { initialState } from "../../store/reducer";
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  updateTodoContent,
} from "../../store/actions";
import Service from "../../service";
import { TodoStatus, Todo } from "../../models/todo";
import { isTodoCompleted } from "../../utils";
import deleteIcon from "../../assets/imgs/trash-solid.svg";
import "./styles.scss";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [todoItemEditing, setTodoItemEditing] = useState<Todo | null>(null);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      try {
        const resp = await Service.createTodo(inputRef.current.value);
        dispatch(createTodo(resp));
        await Service.updateTodo([...todos, resp]);
        inputRef.current.value = "";
      } catch (e) {
        if (e.response.status === 401) {
          history.push("/");
        }
      }
    }
  };

  const onUpdateTodoStatus = async (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    const data = e.target.checked;
    await Service.updateTodo(todos);
    dispatch(updateTodoStatus(todoId, data));
  };

  const onUpdateTodoItem = (
    e: React.ChangeEvent<HTMLInputElement>,
    todo: Todo
  ) => {
    setTodoItemEditing({ ...todo, content: e.target.value });
  };

  const onUpdateTodoContent = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    todoId: string
  ) => {
    if (e.key === "Enter" && todoItemEditing) {
      await Service.updateTodo(todos);
      dispatch(updateTodoContent(todoItemEditing.id, todoItemEditing.content));
    }
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteTodo = async (todoId: string) => {
    await Service.updateTodo(todos);
    dispatch(deleteTodo(todoId));
  };

  const onDeleteAllTodo = async () => {
    await Service.deleteAll();
    dispatch(deleteAllTodos());
  };

  const showTodos = todos.filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

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
        {showTodos.map((todo, index) => {
          return (
            <div key={index} className="ToDo__item">
              <input
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              <input
                type="text"
                className={`ToDo__content--editable ${
                  todo.status === TodoStatus.COMPLETED
                    ? `ToDo__content--completed`
                    : ""
                }`}
                defaultValue={todo.content}
                onChange={(e) => onUpdateTodoItem(e, todo)}
                onKeyDown={(e) => onUpdateTodoContent(e, todo.id)}
              />
              <button
                className="Todo__delete"
                onClick={() => onDeleteTodo(todo.id)}
              >
                <img
                  src={deleteIcon}
                  width="10"
                  height="10"
                  className="icon"
                  alt="icon-delete"
                />
              </button>
            </div>
          );
        })}
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <input
            type="checkbox"
            checked={activeTodos === 0}
            onChange={onToggleAllTodo}
          />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          <button
            className={showing === "ALL" ? `Action__btn--active` : ""}
            onClick={() => setShowing("ALL")}
          >
            All
          </button>
          <button
            className={
              showing === TodoStatus.ACTIVE ? `Action__btn--active` : ""
            }
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className={
              showing === TodoStatus.COMPLETED ? `Action__btn--active` : ""
            }
            onClick={() => setShowing(TodoStatus.COMPLETED)}
          >
            Completed
          </button>
        </div>
        <button onClick={onDeleteAllTodo}>Clear all todos</button>
      </div>
    </div>
  );
};

export default ToDoPage;
