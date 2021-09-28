import React, { useEffect, useReducer, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import TodoForm from "./sections/TodoForm";
import FilteredList from "./sections/FilteredList";
import Filters from "./sections/Filters";
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  updateTodo,
} from "./store/actions";
import Service from "../../service";
import { TodoStatus, TodoFilters } from "../../models/todo";
import { isTodoCompleted } from "../../utils";
import reducer, { initialState } from "./store/reducer";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  // const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  // const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let status = true;
    (async () => {
      const resp = await Service.getTodos();
      if (status) dispatch(setTodos(resp || []));
    })();
    return () => {
      status = false;
    };
  }, []);

  // const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter" && inputRef.current) {
  //     try {
  //       const resp = await Service.createTodo(inputRef.current.value);
  //       dispatch(createTodo(resp));
  //       inputRef.current.value = "";
  //     } catch (e) {
  //       if (e.response.status === 401) {
  //         history.push("/");
  //       }
  //     }
  //   }
  // };

  const onCreateTodo = async (content: string) => {
    const resp = await Service.createTodo(content);
    dispatch(createTodo(resp));
  };

  const onUpdateTodo = async (todoId: string, content: string) => {
    await Service.updateTodo(todoId, content);
    dispatch(updateTodo(todoId, content));
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

  const onDeleteTodo = async (todoId: string) => {
    await Service.deleteTodo(todoId);
    dispatch(deleteTodo(todoId));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  // const showTodos = todos.filter((todo) => {
  //   switch (showing) {
  //     case TodoStatus.ACTIVE:
  //       return todo.status === TodoStatus.ACTIVE;
  //     case TodoStatus.COMPLETED:
  //       return todo.status === TodoStatus.COMPLETED;
  //     default:
  //       return true;
  //   }
  // });

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);
  const [todoFilter, setTodoFilter] = useState<TodoFilters>(TodoFilters.ALL);
  return (
    <div className="ToDo__container">
      <TodoForm onCreateTodo={onCreateTodo} />
      {todos.length ? (
        <FilteredList
          todos={todos}
          filter={todoFilter}
          onDeleteTodo={onDeleteTodo}
          onUpdateTodoStatus={onUpdateTodoStatus}
          onUpdateTodo={onUpdateTodo}
        />
      ) : (
        <p>You do not have any todos yet!</p>
      )}
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
        <Filters filter={todoFilter} setTodoFilter={setTodoFilter} />
        <button className="Action__btn" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;
