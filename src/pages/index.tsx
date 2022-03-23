import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './todo.scss';

import {
  setTodoList,
  createTodo,
  deleteTodo,
  toggleAllTodo,
  deleteAllTodo,
  updateTodo,
} from '../store/todoSlice';
import Service from '../service';
import { TodoStatus } from '../constants/todo';
import LocalStorage from '../localStorage';
import TodoAction from './TodoAction';
import TodoList from './TodoList';
import Todo from '../models/todo';
import { filterTodoByStatus, sumTodoActive } from '../selectors/todo';

const ToDo = () => {
  const [statusFilter, setStatusFilter] = useState<TodoStatus>(TodoStatus.ALL);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const todoList = useSelector(filterTodoByStatus(statusFilter));

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
    if (e.key === 'Enter' && inputRef.current) {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
      inputRef.current.value = '';
    }
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      toggleAllTodo(e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE)
    );
  };

  const onDeleteAllTodo = () => {
    if (todoList.length > 0) {
      if (window.confirm('Are you sure delete all todo')) {
        dispatch(deleteAllTodo());
      }
    } else {
      alert("You don't have any todo to delete");
    }
  };

  const handleDeleteTodo = (todo: Todo) => {
    if (todo && window.confirm(`Are you sure to delete ${todo.content}`)) {
      dispatch(deleteTodo(todo.id));
    }
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
      <div>
        <TodoList
          todoList={todoList}
          handleUpdateTodoStatus={handleUpdateTodoStatus}
          handleUpdateTodoContent={handleUpdateTodoContent}
          handleDeleteTodo={handleDeleteTodo}
        />
      </div>
      <TodoAction
        todoList={todoList}
        statusActive={statusFilter}
        areAllTodoActive={useSelector(sumTodoActive())}
        onToggleAllTodo={onToggleAllTodo}
        setStatusFilter={setStatusFilter}
        onDeleteAllTodo={onDeleteAllTodo}
      />
    </div>
  );
};

export default ToDo;
