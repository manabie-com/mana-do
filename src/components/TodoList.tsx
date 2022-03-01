/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef } from "react";
import { Context as TodoContext } from "../context/TodoContext";
import { TodoStatus } from "../models/todo";
import Service from "../service";
import { setTodos } from "../store/actions";
import { TodoItem } from "./TodoItem";

const TodoList: React.FC = () => {
  const {
    state: { todos, filter },
    dispatch,
  } = useContext(TodoContext);

  const wrapperRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || {}));
    })();
  }, []);

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "ALL":
        return todo;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      default:
        return todo;
    }
  });

  return (
    <div className="ToDo__list" ref={wrapperRef}>
      {filteredTodos.map((todo) => {
        return <TodoItem todo={todo} key={todo.id} />;
      })}
    </div>
  );
};

export default TodoList;
