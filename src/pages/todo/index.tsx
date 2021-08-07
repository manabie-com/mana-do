import React, { useEffect, useReducer, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import reducer, { initialState } from '../../store/reducer';
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  editTodo,
} from '../../store/actions';
import Service from '../../service';
import { Todo, TodoStatus } from '../../models/todo';
import { isTodoCompleted } from '../../utils';

import Actions from './Actions';
import TodoItem from './TodoItem';

import { ButtonDanger } from '../../components/button/Button';
import './styles.css';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('vao day khong: ', inputRef.current?.value);
    if (
      e.key === 'Enter' &&
      inputRef.current &&
      inputRef.current?.value !== ''
    ) {
      try {
        const resp = await Service.createTodo(inputRef.current.value.trim());
        dispatch(createTodo(resp));
        inputRef.current.value = '';
      } catch (e) {
        if (e.response.status === 401) {
          history.push('/');
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

  const handleEditTodo = (todo: Todo) => {
    dispatch(editTodo(todo));
  };

  const showTodos = todos.filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      case TodoStatus.DELETED:
        return todo.status === TodoStatus.DELETED;
      default:
        return (
          todo.status === TodoStatus.ACTIVE ||
          todo.status === TodoStatus.COMPLETED
        );
    }
  });

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  const onDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className='ToDo__container'>
      <div className='Todo__creation'>
        <input
          ref={inputRef}
          className='Todo__input'
          placeholder='What need to be done?'
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className='ToDo__list'>
        {showTodos.reverse().map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            handleEditTodo={handleEditTodo}
            isTodoCompleted={isTodoCompleted}
            onUpdateTodoStatus={onUpdateTodoStatus}
            onDeleteTodo={onDeleteTodo}
          />
        ))}
      </div>
      <div className='Todo__toolbar'>
        {todos.length > 0 ? (
          <input
            type='checkbox'
            checked={activeTodos === 0}
            onChange={onToggleAllTodo}
          />
        ) : (
          <div />
        )}
        <Actions setShowing={setShowing} />
        <ButtonDanger title='Clear all' onClick={onDeleteAllTodo} />
      </div>
    </div>
  );
};

export default ToDoPage;
