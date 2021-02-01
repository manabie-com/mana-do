import React, { useEffect, useState, useRef, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import FlipMove from 'react-flip-move';

import { Todo } from 'models/todo';
import { day, dayName, month, year } from 'utils';

import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos
} from 'store/actions';
import Service from 'service';
import { TodoStatus } from 'models/todo';
import { isTodoCompleted } from 'utils';

import './index.css';
import TodoItem from 'components/TodoItem';
import Auth from 'service/auth';
import { TodoContext } from 'App';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = ({ history }: RouteComponentProps) => {
  const todoContext = useContext(TodoContext);
  console.log(todoContext);
  const { store, dispatch } = todoContext as {
    store: { todos: Todo[] };
    dispatch: any;
  };

  const [todoInput, setTodoInput] = useState('');
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const [editId, setEditId] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { todos = [] as Todo[] } = store || {};

  // console.log(initialState);

  console.log(store);

  useEffect(() => {
    Auth.authenticate(() => {});

    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();

    return () => {
      console.log('UNMOUNT');
      localStorage.removeItem('token');
    };
    // localStorage.setItem('ahihi', '456');
  }, [dispatch]);

  const updateEditId = (id: string) => {
    setEditId(id);
  };

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = todoInput.trim();
    if (e.key === 'Enter' && inputValue.length > 0) {
      try {
        const resp = await Service.createTodo(inputValue);
        dispatch(createTodo(resp));

        // Clear todo input
        setTodoInput('');
      } catch (e) {
        if (e.response.status === 401) {
          history.push('/');
        }
      }
    }
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const showTodos = todos
    .filter((todo) => {
      switch (showing) {
        case TodoStatus.ACTIVE:
          return todo.status === TodoStatus.ACTIVE;
        case TodoStatus.COMPLETED:
          return todo.status === TodoStatus.COMPLETED;
        default:
          return true;
      }
    })
    .sort((a, b) => (a.created_date > b.created_date ? -1 : 1)); // sort by recent time order

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  console.log(activeTodos);

  // useEffect(() => {
  //   console.log('GO');
  //   // setTodoInput('asd');
  // }, [showTodos]);
  console.log(showTodos);

  const onTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput(e.currentTarget.value);
  };

  // const handleEdit = (id: string) => {
  //   // setTodoInput(e.currentTarget.value);
  //   console.log(id);
  //   setEditId(id);
  //   //    dispatch(updateTodo(id, ))
  // };
  console.log('render');

  return (
    <div className='ToDo__container'>
      <div className='Todo__header'>
        <div className='Todo__creation'>
          <input
            ref={inputRef}
            value={todoInput}
            className='Todo__input'
            placeholder='What need to be done?'
            onKeyDown={onCreateTodo}
            onChange={onTodoInput}
          />
        </div>

        <div className='Todo__date'>
          <span className='date__left'>{day}</span>
          <div className='date__right'>
            <span className='date__top'>{month}</span>
            <div className='date__bottom'>
              <span className='date__year'>{year}</span>
              <span className='date__day'>{dayName}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='ToDo__list'>
        <FlipMove>
          {showTodos.map((todo) => {
            const { id = '0' } = todo;
            return (
              <TodoItem
                key={id}
                todo={todo}
                updateEditId={updateEditId}
                edit={id === editId}
                // lineColor={randomColor}
              />
            );
          })}
        </FlipMove>
      </div>

      <div className='Todo__toolbar'>
        {todos.length > 0 ? (
          <input
            className='Todo__checkAll'
            type='checkbox'
            checked={activeTodos === 0}
            onChange={onToggleAllTodo}
          />
        ) : (
          <div />
        )}
        <div className='Todo__tabs'>
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
          <button className='Action__btn' onClick={() => setShowing('ALL')}>
            All
          </button>
          <button className='Action__btn' onClick={onDeleteAllTodo}>
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDoPage;
