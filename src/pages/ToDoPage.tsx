import React, { useEffect, useReducer, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import reducer, { initialState } from "../store/reducer";
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  updateTodo,
} from "../store/actions";
import Service from "../service";
import { Todo, TodoStatus } from "../models/todo";
import { isTodoCompleted } from "../utils";
import TodoItem from "../components/TodoItem";
import ActionButton from "../components/ActionButton";
import styled from "styled-components";

const Container = styled.div`
  padding-top: 5rem;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  justify-content: center;
  width: 100%;

  .todo {
    max-width: 500px;
    width: 100%;

    &__page-title {
      font-size: 30px;
      text-align: left;
      padding-bottom: 24px;
      font-weight: bold;
    }

    &__creation {
      display: flex;

      &__input {
        flex: 1 1;
      }
    }

    &__list {
      &-wrapper {
        border: 1px solid rgba(0, 0, 0, 0.13);
        border-radius: 8px;
        margin-top: 30px;
        box-shadow: 0 0 5px rgb(0 0 0 / 20%);
      }
    }

    &__toolbar {
      display: flex;
      justify-content: space-between;
      padding: 8px 15px;
      flex-wrap: wrap;

      input[type="checkbox"] {
        min-height: unset;
      }
    }

    &__tabs {
      display: flex;
      justify-content: center;

      > *:not(:last-child) {
        margin-right: 8px;
      }
    }

    &__clear {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__empty-block {
      border-bottom: 1px solid lightgrey;
      padding: 21px 15px;
      font-style: italic;
      color: lightgray;
    }
  }

  @media screen and (max-width: 567px) {
    .todo {
      &__clear {
        padding-top: 10px;
        width: 100%;
      }
    }
  }
`;

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  // change showing to selectedTab for meaning
  const [selectedTab, setSelectedTab] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<HTMLInputElement>(null);

  const listTabs: EnhanceTodoStatus[] = [
    "ALL",
    TodoStatus.ACTIVE,
    TodoStatus.COMPLETED,
  ];

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      try {
        const content = inputRef?.current?.value?.trim();
        if (content === "") return;
        const resp = await Service.createTodo(content);
        inputRef.current.value = "";
        dispatch(createTodo(resp));
      } catch (e) {
        if (e.response.status === 401) {
          history.push("/");
        }
      }
    }
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const handleDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  const handleUpdateTodoItem = (todo: Todo) => {
    dispatch(updateTodo(todo));
  };

  const showTodos = todos.filter((todo) => {
    switch (selectedTab) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo.status) ? accum : accum + 1;
  }, 0);

  return (
    <Container>
      <div className="todo">
        <div className="todo__page-title">Todo List</div>
        <div className="todo__creation">
          <input
            ref={inputRef}
            className="todo__creation__input"
            placeholder="What need to be done?"
            onKeyDown={onCreateTodo}
          />
        </div>
        <div className="todo__list-wrapper">
          {showTodos.length === 0 ? (
            <div className="todo__empty-block">Empty List</div>
          ) : (
            ""
          )}
          <div className="todo__list">
            {showTodos.map((todo, index) => {
              return (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onUpdate={(e) => onUpdateTodoStatus(e, todo.id)}
                  onDelete={() => handleDeleteTodo(todo.id)}
                  onUpdateContent={(content: string) =>
                    handleUpdateTodoItem({ ...todo, content })
                  }
                />
              );
            })}
          </div>
          <div className="todo__toolbar">
            {todos.length > 0 ? (
              <input
                type="checkbox"
                checked={activeTodos === 0}
                onChange={onToggleAllTodo}
              />
            ) : (
              <div />
            )}
            <div className="todo__tabs">
              {listTabs.map((status) => (
                <ActionButton
                  key={status}
                  text={status.toLowerCase()}
                  active={selectedTab === status}
                  onClick={() => setSelectedTab(status)}
                />
              ))}
            </div>
            <div className="todo__clear">
              <ActionButton text="Clear all todos" onClick={onDeleteAllTodo} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ToDoPage;
