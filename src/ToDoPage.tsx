import React, { useEffect, useReducer, useState } from "react";

import reducer, { initialState } from "./store/reducer";
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  updateTodo,
} from "./store/actions";
import Service from "./service";
import { isTodoCompleted } from "./utils";
import TodoInput from "components/TodoInput";
import FilterButton from "components/FilterButton";
import TodoList from "components/TodoList";
import { Todo, TodoStatus } from "models/todo";

type EnhanceTodoStatus = TodoStatus | "ALL";

function filterTodos(type: EnhanceTodoStatus, todos: Todo[]) {
  return type === "ALL" ? todos : todos.filter((todo) => todo.status === type);
}

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showTodos, setShowTodos] = useState<Todo[]>(todos);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, []);

  useEffect(() => {
    const listTodo = filterTodos(showing, todos);
    setShowTodos(listTodo);
  }, [showing, todos]);

  const onCreateTodo = async (value: string) => {
    if (!value) return;
    const resp = await Service.createTodo(value);
    dispatch(createTodo(resp));
  };

  function onDeleteTodo(todoId: string) {
    Service.deleteTodo(todoId).then(() => {
      dispatch(deleteTodo(todoId));
    });
  }

  function onUpdateTodo(todo: Todo) {
    Service.updateTodo(todo).then(() => {
      dispatch(updateTodo(todo));
    });
  }

  const onUpdateTodoStatus = (todoId: string, checked: boolean) => {
    const todo = todos.find((todo) => todo.id === todoId);
    if (!todo) return;
    const status = checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
    Service.updateTodo({
      ...todo,
      status,
    }).then(() => {
      dispatch(updateTodoStatus(todoId, checked));
    });
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    Service.toggleAllStatus(checked).then(() => {
      dispatch(toggleAllTodos(checked));
    });
  };

  const onDeleteAllTodo = () => {
    Service.deleteAllTodos().then(() => {
      dispatch(deleteAllTodos());
    });
  };

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  return (
    <div className="ToDo__container">
      <div className="Todo__creation">
        <TodoInput onEnter={onCreateTodo} />
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
          <FilterButton
            active={showing === "ALL"}
            onClick={() => setShowing("ALL")}
          >
            All
          </FilterButton>
          <FilterButton
            active={showing === TodoStatus.ACTIVE}
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </FilterButton>
          <FilterButton
            active={showing === TodoStatus.COMPLETED}
            onClick={() => setShowing(TodoStatus.COMPLETED)}
          >
            Completed
          </FilterButton>
        </div>
        <button className="Action__btn" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
      <TodoList
        list={showTodos}
        onUpdateTodoStatus={onUpdateTodoStatus}
        onDeleteTodo={onDeleteTodo}
        onUpdateTodo={onUpdateTodo}
      />
    </div>
  );
};

export default ToDoPage;
