import React, { useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';

import { TodoStatus, Todo } from '../../models/todo';
import { isTodoCompleted } from '../../utils';
import {
  useTodos,
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
  useDeleteTodos,
  useCompleteTodoAll,
  useActiveAll
} from 'hooks/todos';
import BaseButton from 'components/BaseButton';
import SingleTodo from './Todo';

import TodoPageWrapper from './style';
import useLocalStorage from 'hooks/useLocalStorage';
import { clearLogin } from 'store/modules/auth/slice';

const ToDoPage = ({ history }: RouteComponentProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const [, setToken] = useLocalStorage('token', '');
  const dispatch = useDispatch();

  const { todos } = useTodos();
  const { createTodo, isCreating } = useCreateTodo();
  const { deleteTodo } = useDeleteTodo();
  const { deleteTodos } = useDeleteTodos();
  const { updateTodo } = useUpdateTodo();
  const { completeAll } = useCompleteTodoAll();
  const { activeAll } = useActiveAll();

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id, {
      onSuccess: () => {
        queryClient.invalidateQueries('todos');
      }
    });
  };

  const onCreateTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current && !isCreating) {
      if (inputRef.current.value) {
        createTodo(inputRef.current.value, {
          onSuccess: () => {
            queryClient.invalidateQueries('todos');
            inputRef.current.value = '';
          },
          onError: () => history.push('/')
        });
      }
    }
  };

  const handleCompleteAll = () => {
    completeAll(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries('todos');
      }
    });
  };

  const handleActiveAll = () => {
    activeAll(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries('todos');
      }
    });
  };

  const handleUpdateStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todo: Todo
  ) => {
    todo.status = e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
    updateTodo(todo, {
      onSuccess: () => {
        queryClient.invalidateQueries('todos');
      }
    });
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      handleActiveAll();
    } else {
      handleCompleteAll();
    }
  };

  const handleDeleteAll = () => {
    deleteTodos(undefined, {
      onSuccess: () => queryClient.invalidateQueries('todos')
    });
  };

  const handleLogout = () => {
    setToken('');
    dispatch(clearLogin());
    history.push('/');
  };

  const activeTodos = todos?.reduce(function(accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  return (
    <>
      <TodoPageWrapper className='d-flex d-justify-center d-align-center'>
        <div className='Todo__container'>
          <div className='Todo__creation'>
            <input
              ref={inputRef}
              className='Todo__input'
              placeholder='What need to be done?'
              onKeyDown={onCreateTodo}
            />
          </div>
          <div className='Todo__list'>
            {todos.length > 0 ? (
              <>
                <input
                  type='checkbox'
                  checked={activeTodos === 0}
                  onChange={onToggleAllTodo}
                  className='checkall'
                />
              </>
            ) : (
              <div />
            )}
            {todos.map(todo => (
              <SingleTodo
                todo={todo}
                key={todo.id}
                onUpdateStatus={handleUpdateStatus}
                onDeleteTodo={handleDeleteTodo}
              />
            ))}
          </div>
          <div className='Todo__toolbar'>
            <div className='Todo__tabs'>
              <BaseButton onClick={handleActiveAll}>Active</BaseButton>
              <BaseButton onClick={handleCompleteAll}>Completed</BaseButton>
              <BaseButton danger onClick={handleDeleteAll}>
                Clear all todos
              </BaseButton>
            </div>
          </div>
          <div className='d-flex d-justify-center d-align-center'>
            <BaseButton className='btn__logout' onClick={handleLogout}>
              {' '}
              Logout{' '}
            </BaseButton>
          </div>
        </div>
      </TodoPageWrapper>
    </>
  );
};

export default ToDoPage;
