import React, { useEffect, useRef, useState } from "react";
import "./todo.css";
import {
  setTodoList,
  createTodo,
  deleteTodo,
  toggleAllTodo,
  deleteAllTodo,
  updateTodo,
} from "../store/todoSlice";
import Service from "../service";
import { TodoStatus } from "../constants/todo";
import LocalStorage from "../localStorage";
import TodoAction from "./TodoAction";
import TodoList from "./TodoList";
import Todo from "../models/todo";
import { filterTodoByStatus } from "../selectors/todo";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/hook";

const ToDo = () => {
  const [statusFilter, setStatusFilter] = useState<TodoStatus>(TodoStatus.ALL);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { todoList } = useAppSelector((state) => state.todo);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodoList();
      dispatch(setTodoList(resp || []));
    })();
  }, [dispatch]);

  useEffect(() => {
    LocalStorage.updateToDoToLocalStorage(todoList);
  }, [todoList]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
      inputRef.current.value = "";
    }
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    dispatch(
      toggleAllTodo(e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE)
    );
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodo());
  };

  const handleDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  const handleUpdateTodoStatus = (todo: Todo, checked: boolean) => {
    todo.Status = checked;
    dispatch(updateTodo(todo));
  };

  const handleUpdateTodoContent = (todo: Todo, content: string) => {
    todo.Content = content;
    dispatch(updateTodo(todo));
  };

  return (
    <div className="todo__container" data-test="todo-container">
      <div className="todo__creation">
        <input
          ref={inputRef}
          className="todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      <TodoList
        todoList={filterTodoByStatus(statusFilter, todoList)}
        handleUpdateTodoStatus={handleUpdateTodoStatus}
        handleUpdateTodoContent={handleUpdateTodoContent}
        handleDeleteTodo={handleDeleteTodo}
      />
      <TodoAction
        todoList={todoList}
        statusActive={statusFilter}
        onToggleAllTodo={onToggleAllTodo}
        setStatusFilter={setStatusFilter}
        onDeleteAllTodo={onDeleteAllTodo}
      />
    </div>
  );
};

export default ToDo;
