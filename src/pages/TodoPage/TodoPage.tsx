import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getTodos, createTodo } from '../../store/actions/todos.action';
import { TodoStatus } from '../../models/todo';
import { useThunkWithProgress } from '../../hooks';
import { RoutePath } from '../../routes';
import { todosSelector } from '../../store/reducers/todos.reducer';
import { TodoList } from './components';

type EnhanceTodoStatus = TodoStatus | 'ALL';

export const TodoPage: React.FC = () => {
  const [todoStatusFilter, setTodoStatusFilter] = React.useState<EnhanceTodoStatus>('ALL');
  const [newTodoContent, setNewTodoContent] = React.useState('');

  const history = useHistory();

  const dispatch = useDispatch();

  const todos = useSelector(todosSelector);

  const { isLoading: isLoadingTodos, thunkWithProgress: getTodosWithProgress } = useThunkWithProgress(getTodos);

  React.useEffect(() => {
    dispatch(getTodosWithProgress());
  }, [dispatch, getTodosWithProgress]);

  const performTodoCreation = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTodoContent) {
      try {
        dispatch(createTodo(newTodoContent));
      } catch (e) {
        if (e.response.status === 401) {
          history.push(RoutePath.signIn);
        }
      } finally {
        setNewTodoContent('');
      }
    }
  };

  const filteredTodo = todoStatusFilter === 'ALL' ? todos : todos.filter(({ status }) => status === todoStatusFilter);

  return (
    <div>
      {isLoadingTodos ? (
        <div className='loader'></div>
      ) : (
        <div className='todo__container'>
          <div className='todo-filter'>
            <span>Filter by: </span>
            <input
              type='radio'
              id='all'
              value='ALL'
              onChange={() => {
                setTodoStatusFilter('ALL');
              }}
              checked={todoStatusFilter === 'ALL'}
            />
            <label htmlFor='all'>All</label>
            <input
              type='radio'
              id='active'
              value='ACTIVE'
              onChange={() => {
                setTodoStatusFilter('ACTIVE');
              }}
              checked={todoStatusFilter === 'ACTIVE'}
            />
            <label htmlFor='active'>Active</label>
            <input
              type='radio'
              id='completed'
              value='COMPLETED'
              onChange={() => {
                setTodoStatusFilter('COMPLETED');
              }}
              checked={todoStatusFilter === 'COMPLETED'}
            />
            <label htmlFor='completed'>Completed</label>
          </div>

          <div className='todo__creation'>
            <input
              id='todo-content'
              value={newTodoContent}
              onChange={(e) => setNewTodoContent(e.target.value)}
              className='todo__input'
              placeholder='What need to be done?'
              onKeyDown={performTodoCreation}
            />
          </div>

          <TodoList todos={filteredTodo} />
        </div>
      )}
    </div>
  );
};
