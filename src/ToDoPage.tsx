import React, { useEffect, useReducer, useState, useCallback } from "react";
import { RouteComponentProps } from "react-router-dom";

import reducer, { initialState } from "./store/reducer";
import {
  setTodos,
  createTodo,
  deleteTodo,
  updateTodos,
  deleteAllTodos,
  updateTodoStatus,
} from "./store/actions";
import Service from "./service";
import { Todo, TodoStatus } from "./models/todo";
import { isTodoCompleted } from "./utils";

import TodoItem from "./components/TodoItem";
import TodoInput from "./components/TodoInput";

const ToDoPage = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<TodoStatus | "ALL">("ALL");
  const [toggleAll, setToggleAll] = useState(false);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, []);

  const handleCreateTodo = useCallback(async (content: string) => {
    try {
      const resp = await Service.createTodo(content);
      dispatch(createTodo(resp));
    } catch (error) {
      if ((error as any)?.response?.status === 401) {
        history.push("/");
      }
    }
  }, []);

  const handleupdateTodoStatus = useCallback(async (todo: Todo) => {
    const resp = await Service.updateTodo(todo);
    if (resp) {
      dispatch(updateTodoStatus(resp));
    }
  }, []);

  const handleDeleteTodo = useCallback(async (todoId: string) => {
    const todoIdDeleted = await Service.deleteTodo(todoId);
    if (todoIdDeleted) {
      dispatch(deleteTodo(todoIdDeleted));
    }
  }, []);

  const onDeleteAllTodo = useCallback(async () => {
    const resp = await Service.deleteAllTodos();
    if (!resp?.length) return;
    dispatch(deleteAllTodos());
  }, []);

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

  const onToggleAllTodo = useCallback(async () => {
    const newToggleVal = !toggleAll;
    const list = await Service.getTodos();
    if (!list?.length) return;
    const newList = list.map((item) => {
      return {
        ...item,
        status: newToggleVal ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
      };
    });
    const resp = await Service.updateTodos(newList);
    if (!resp?.length) return;
    dispatch(updateTodos(resp));
  }, [toggleAll]);

  useEffect(() => {
    const activeTodos = todos.reduce((sum, todo) => {
      return isTodoCompleted(todo) ? sum : sum + 1;
    }, 0);
    setToggleAll(!activeTodos);
  }, [todos]);

  return (
    <div className="ToDo__container">
      <div className="Todo__creation">
        <TodoInput
          clearTextWhenEnter
          className="Todo__input"
          placeholder="What need to be done?"
          onEnter={handleCreateTodo}
          content=""
        />
      </div>
      <div className="ToDo__list">
        {showTodos.map((todo) => {
          return (
            <TodoItem
              data={todo}
              key={todo.id}
              onChange={handleupdateTodoStatus}
              onDelete={handleDeleteTodo}
            />
          );
        })}
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <input
            type="checkbox"
            checked={toggleAll}
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
