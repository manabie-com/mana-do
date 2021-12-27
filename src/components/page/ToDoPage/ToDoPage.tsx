import React, { useEffect, useState } from 'react';

import {
  setTodos,
  toggleAllTodos,
  deleteAllTodos,
} from '../../../store/actions';
import Service from '../../../service';
import { TodoStatus } from '../../../models/todo';
import { isTodoCompleted } from '../../../utils';
import ToDoInput from '../../common/ToDoInput/ToDoInput.components';
import ToDoItem from '../../common/ToDoItem/ToDoItem.components';
import ActionButton from '../../common/ActionButton/ActionButton.components';
import ToDoTabs from '../../common/ToDoTabs/ToDoTabs.components';
import { useToDoPageContext } from '../../../context/ToDoPageProvider';

export type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = () => {
  const { todos, dispatch } = useToDoPageContext();
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  // create error message state for error handling
  const [error, setError] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const resp = await Service.getTodos();
        dispatch(setTodos(resp));
      } catch (error) {
        setError('Have an error when getTodos');
      }
    })();
    setLoading(false);
  }, [dispatch]);

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    // Optimis update
    Service.toggleAllTodos(checked);
    dispatch(toggleAllTodos(checked));
  };

  const onDeleteAllTodo = async () => {
    try {
      await Service.deleteAllTodos();
      dispatch(deleteAllTodos());
    } catch (error) {
      setError('Have error when delete all todos');
    }
  };

  const showTodos = todos.filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  return (
    <div className='ToDo__container'>
      <div className='Todo__creation'>
        <ToDoInput />
      </div>
      {!loading ? (
        <>
          <div className='ToDo__list'>
            {!showTodos.length && <span>Nothing to do</span>}
            {showTodos.map((todo) => {
              const { id, content, created_date } = todo;
              return (
                <ToDoItem
                  key={id}
                  id={id}
                  checked={isTodoCompleted(todo)}
                  content={content}
                  createdDate={new Date(created_date)}
                />
              );
            })}
          </div>
          <div className='Todo__toolbar'>
            {todos.length > 0 ? (
              <input
                data-testid='toggle-all-todos'
                type='checkbox'
                checked={activeTodos === 0}
                onChange={onToggleAllTodo}
              />
            ) : (
              <div />
            )}
            <ToDoTabs setShowing={setShowing} activeTab={showing} />
            <ActionButton
              data-testid='clear-all-todos'
              className='Action__btn'
              onClick={onDeleteAllTodo}
            >
              Clear all todos
            </ActionButton>
          </div>
          {error && (
            <div>
              <p style={{ color: 'red' }}>{error}</p>
            </div>
          )}
        </>
      ) : (
        <span>Loading</span>
      )}
    </div>
  );
};

export default ToDoPage;
