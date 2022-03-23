import React, { useEffect, useRef, useState } from 'react';
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
import { filterTodoByStatus, findTodoWithTodoId } from '../selectors/todo';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store/hook';
import classNames from 'classnames';

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

  const handleDeleteTodo = (todoId: string) => {
    const todo = findTodoWithTodoId(todoId, todoList);
    if (todo && window.confirm(`Are you sure to delete ${todo.content}`)) {
      dispatch(deleteTodo(todoId));
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
      <div
        className={classNames({
          'todo__container-scroll':
            filterTodoByStatus(statusFilter, todoList).length > 5,
        })}>
        <TodoList
          todoList={filterTodoByStatus(statusFilter, todoList)}
          handleUpdateTodoStatus={handleUpdateTodoStatus}
          handleUpdateTodoContent={handleUpdateTodoContent}
          handleDeleteTodo={handleDeleteTodo}
        />
      </div>
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
