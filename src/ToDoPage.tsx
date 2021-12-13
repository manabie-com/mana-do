import React, { useEffect, useReducer, useRef, useState } from "react";

import reducer, { initialState } from "./store/reducer";
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
} from "./store/actions";
import Service from "./service";
import { TodoStatus, UpdateTodo, Todo } from "./models/todo";
import { isTodoCompleted } from "./utils";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<HTMLInputElement>(null);
  const inputEditRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const resp = (await Service.getTodos()) || [];
      const newTodosLocal =
        JSON.parse(localStorage.getItem("TodoList") as string) || [];

      const newTodos: Todo[] = newTodosLocal.map((e: Todo) => {
        delete e.isEdit;
        delete e.status;
        return e;
      });
      dispatch(setTodos([...resp, ...newTodos]));
    })();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
      inputRef.current.value = "";
    }
  };

  const onUpdateTodoStatus = (data: UpdateTodo, todoId: string) => {
    dispatch(updateTodoStatus(todoId, data));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
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

  const onBlurEdit = (todos: Todo[]) => {
    const newTodos = todos.map((e) => {
      delete e.isEdit;
      return e;
    });
    dispatch(setTodos([...newTodos]));
  };

  const onOpenEdit = (todo: Todo, todos: Todo[]) => {
    const newTodos = todos.reduce((acc: Todo[], curr: Todo) => {
      if (curr.id === todo.id) acc.push({ isEdit: true, ...curr });
      else {
        delete curr.isEdit;
        acc.push(curr);
      }
      return acc;
    }, []);
    dispatch(setTodos([...newTodos]));

    setTimeout(() => {
      if (inputEditRef.current) {
        inputEditRef.current.value = todo.content.toString();
        inputEditRef.current.focus();
      }
    }, 100);
  };

  const onEditContent = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string
  ) => {
    const value = inputEditRef.current?.value?.trim();
    if (e.key === "Enter" && value) {
      onUpdateTodoStatus({ content: value, isEdit: false }, id);
    }
  };

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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onUpdateTodoStatus(
                    {
                      status: e.target.checked
                        ? TodoStatus.COMPLETED
                        : TodoStatus.ACTIVE,
                    },
                    todo.id
                  )
                }
              />
              {todo.isEdit ? (
                <input
                  ref={inputEditRef}
                  type="text"
                  className="edit-input"
                  onBlur={() => onBlurEdit(showTodos)}
                  onKeyDown={(e) => onEditContent(e, todo.id)}
                />
              ) : (
                <span onDoubleClick={() => onOpenEdit(todo, showTodos)}>
                  {todo.content}
                </span>
              )}
              <button
                className="Todo__delete"
                onClick={() => dispatch(deleteTodo(todo.id))}
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
            checked={activeTodos === 0}
            onChange={onToggleAllTodo}
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
        <button className="Action__btn" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;
