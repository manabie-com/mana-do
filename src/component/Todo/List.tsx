import React, { useState } from "react";
import {
  deleteTodo,
  updateTodoStatus,
  UpdateTodoStatusAction,
  UpdateTodoAction,
  DeleteTodoAction,
  updateTodo,
} from "store/actions";
import { TodoStatus } from "models/todo";
import { isTodoCompleted } from "utils";
import { AppState } from "store/reducer";
import Trash from "component/Icons/Trash";
import Modal from "component/Todo/Modal";

export interface ListProps {
  dispatch: React.Dispatch<
    UpdateTodoStatusAction | UpdateTodoAction | DeleteTodoAction
  >;
  todos: AppState["todos"];
  showing: string;
}

export interface IActiveTodo {
  id: string;
  content: string;
}

const List = ({ dispatch, todos, showing }: ListProps) => {
  const [showModal, setShowModal] = useState(false);
  const [activeTodo, setActiveTodo] = useState<IActiveTodo | null>(null);
  const toggleModal = () => setShowModal(!showModal);

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

  const onEditSubmit = (id: string, content: string) => {
    dispatch(updateTodo({ id, content }));
  };

  const sortCreatedDateDescending = (a: string, b: string) => {
    return new Date(b).getTime() - new Date(a).getTime();
  };

  const handleDoubleClick = (id: string, content: string) => {
    setActiveTodo({ id, content });
    toggleModal();
  };

  return (
    <div role="list" className="todo__list">
      {showTodos
        .sort((a, b) =>
          sortCreatedDateDescending(a.created_date, b.created_date)
        )
        .map((todo) => {
          return (
            <div
              role="listitem"
              key={todo.id}
              className="todo__item"
              data-testid={`todo-item-${todo.id}`}
            >
              <span className="todo__checkbox">
                <input
                  data-testid={`checkbox-${todo.id}`}
                  id={`checkbox-${todo.id}`}
                  type="checkbox"
                  checked={isTodoCompleted(todo)}
                  onChange={(e) =>
                    dispatch(updateTodoStatus(todo.id, e.target.checked))
                  }
                />
                <label className="todo__label" htmlFor={`checkbox-${todo.id}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      d="M1.73 12.91l6.37 6.37L22.79 4.59"
                    />
                  </svg>
                </label>
              </span>

              <div
                onDoubleClick={() => handleDoubleClick(todo.id, todo.content)}
                className="content-wrapper"
                data-testid={`todo-content-${todo.id}`}
              >
                <p
                  className={`todo__content ${
                    todo.status === "COMPLETED"
                      ? "todo__content--completed"
                      : ""
                  }`}
                >
                  {todo.content}
                </p>
              </div>

              <button
                className="todo__delete"
                onClick={() => dispatch(deleteTodo(todo.id))}
                data-testid={`delete-button-${todo.id}`}
              >
                <Trash />
              </button>
            </div>
          );
        })}

      {showModal && activeTodo && (
        <Modal
          id={activeTodo.id}
          content={activeTodo.content}
          toggleModal={toggleModal}
          onEditSubmit={onEditSubmit}
        />
      )}
    </div>
  );
};

export default List;
