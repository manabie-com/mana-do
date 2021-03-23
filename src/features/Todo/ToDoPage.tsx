import React, { useEffect, useReducer, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Todo, TodoStatus } from "../../models/todo";
import Service from "../../service";
import {
  createTodo,
  deleteAllTodos,
  deleteTodo,
  setTodos,
  toggleAllTodos,
  updateTodoStatus,
} from "../../store/actions";
import reducer, { initialState } from "../../store/reducer";
import { isTodoCompleted } from "../../utils";
import "./styles.css";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const [editTodo, setEditTodo] = useState<Todo>();
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
        if (editTodo?.id) {
          const index = todos.findIndex((todo) => todo.id === editTodo?.id);
          todos.splice(index, 1, editTodo);
          localStorage.setItem("todos", JSON.stringify(todos));
          history.push("/todo");
          setEditTodo({ ...editTodo, id: "", content: "" });
        } else {
          const resp = await Service.createTodo(inputRef.current.value);
          dispatch(createTodo(resp));
          inputRef.current.value = "";
        }
      } catch (e) {
        if (e.response.status === 401) {
          history.push("/");
        }
      }
    }
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string,
    editTodo: any
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
    setEditTodo({ ...editTodo, content: "" });
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

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    editTodo: any
  ) => {
    const value = e.target.value;
    setEditTodo({ ...editTodo, content: value });
  };

  const onDeleteTodo = (editTodo: any, todoId: string) => {
    dispatch(deleteTodo(todoId));
    setEditTodo({ ...editTodo, content: "" });
  };

  return (
    <div className="ToDo__container">
      <h1 className="ToDo__title">My To Do</h1>
      <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
          value={editTodo?.content}
          onChange={(e) => handleOnChange(e, editTodo)}
        />
      </div>
      <div className="ToDo__list">
        {showTodos.map((todo, index) => {
          return (
            <div key={index} className="ToDo__item">
              <input
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id, editTodo)}
              />
              <span
                style={
                  todo.status === "COMPLETED"
                    ? {
                        textDecoration: "line-through",
                        color: "red",
                      }
                    : {}
                }
                onDoubleClick={() => setEditTodo(todo)}
              >
                {todo.content}
              </span>
              <button
                className="Todo__delete"
                onClick={() => onDeleteTodo(editTodo, todo.id)}
              >
                Delete
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
            onChange={(e) => dispatch(toggleAllTodos(e.target.checked))}
          />
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
        <button
          className="Action__btn"
          onClick={() => dispatch(deleteAllTodos())}
        >
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;
