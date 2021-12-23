import React, { useEffect, useReducer, useState } from 'react';

import reducer, { initialState } from './store/reducer';
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
} from './store/actions';
import Service from './service';
import { TodoStatus } from './models/todo';
import { isTodoCompleted } from './utils';
import ToDoInput from './components/common/ToDoInput/ToDoInput.components';
import ToDoItem from './components/common/ToDoItem/ToDoItem.components';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  // create error message state for error handling
  const [error, setError] = React.useState<String>('');
  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  // const handleOnSubmitTodoInput = async (value: string) => {};
  const handleOnSubmitTodoInput = React.useCallback(async (value: string) => {
    try {
      const resp = await Service.createTodo(value);
      dispatch(createTodo(resp));
    } catch (err) {
      setError('Have an error when submit Todo');
    }
  }, []);
  const handleOnClickDeleteTodo = (id: string): void => {
    dispatch(deleteTodo(id));
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
        <ToDoInput handleOnSubmit={handleOnSubmitTodoInput} />
      </div>
      <div className='ToDo__list'>
        {showTodos.map((todo) => {
          const { id, content } = todo;
          return (
            <ToDoItem
              key={id}
              checked={isTodoCompleted(todo)}
              content={content}
              handleOnChangeCheckBox={(e) => onUpdateTodoStatus(e, id)}
              handleOnClickDelete={() => handleOnClickDeleteTodo(id)}
            />
          );
        })}
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
        <div className='Todo__tabs'>
          <button className='Action__btn' onClick={() => setShowing('ALL')}>
            All
          </button>
          <button
            className='Action__btn'
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className='Action__btn'
            onClick={() => setShowing(TodoStatus.COMPLETED)}
          >
            Completed
          </button>
        </div>
        <button className='Action__btn' onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;
