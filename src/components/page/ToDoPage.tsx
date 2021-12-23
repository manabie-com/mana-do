import React, { useEffect, useState } from 'react';

import { setTodos, toggleAllTodos, deleteAllTodos } from '../../store/actions';
import Service from '../../service';
import { TodoStatus } from '../../models/todo';
import { isTodoCompleted } from '../../utils';
import ToDoInput from '../common/ToDoInput/ToDoInput.components';
import ToDoItem from '../common/ToDoItem/ToDoItem.components';
import ActionButton from '../common/ActionButton/ActionButton.components';
import ToDoTabs from '../common/ToDoToolbar/ToDoTabs.components';
import { useToDoPageContext } from '../../context/ToDoPageProvider';

export type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = () => {
  const { todos, dispatch } = useToDoPageContext();
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  // create error message state for error handling
  const [error, setError] = React.useState<String>('');
  useEffect(() => {
    (async () => {
      try {
        const resp = await Service.getTodos();
        dispatch(setTodos(resp));
      } catch (error) {
        setError('Have an error when getTodos');
      }
    })();
  }, [dispatch]);

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    Service.toggleAllTodos(checked);
    dispatch(toggleAllTodos(checked));
  };

  const onDeleteAllTodo = async () => {
    await Service.deleteAllTodos();
    dispatch(deleteAllTodos());
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
      <div className='ToDo__list'>
        {showTodos.map((todo) => {
          const { id, content } = todo;
          return (
            <ToDoItem
              key={id}
              id={id}
              checked={isTodoCompleted(todo)}
              content={content}
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
        <ToDoTabs setShowing={setShowing} />
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
    </div>
  );
};

export default ToDoPage;
