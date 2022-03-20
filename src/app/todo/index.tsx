import React, { useEffect, useReducer, useRef, useState } from "react";
import Service from "../../service";
import { createTodo, deleteAllTodos, setTodos, toggleAllTodos, updateTodoStatus } from "./state/todo.actions";
import reducer, { initialState } from "./state/todo.reducer";
import TodoCreate from "./todo-create";
import TodoItem from "./todo-item";
import TodoToolbar from "./todo-toolbar";
import { EnhancedTodoStatus, TodoStatus } from "./todo.models";
import Styles from "./todo.module.scss";

const ToDo = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhancedTodoStatus>("ALL");
  const inputRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
    }
  };

  const onUpdateTodoStatus = (event: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    dispatch(updateTodoStatus(todoId, event.target.checked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  return (
    <div className={Styles.Container}>
      <TodoCreate ref={inputRef} onKeyDown={onCreateTodo} />

      <div className={Styles.List}>
        {todos.map((todo) => (
          <TodoItem todo={todo} showing={showing} onUpdateTodoStatus={onUpdateTodoStatus} />
        ))}
      </div>

      <TodoToolbar
        todos={todos}
        onToggleAllTodo={onToggleAllTodo}
        onShowAllTodo={() => {
          setShowing(TodoStatus.ACTIVE);
        }}
        onShowActiveTodo={() => {
          setShowing(TodoStatus.ACTIVE);
        }}
        onShowCompletedTodo={() => {
          setShowing(TodoStatus.COMPLETED);
        }}
        onDeleteAllTodo={onDeleteAllTodo}
      />
    </div>
  );
};

export default ToDo;
