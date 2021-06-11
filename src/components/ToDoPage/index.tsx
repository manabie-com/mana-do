import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import styles from './index.module.scss';
import Header from '../Header';
import TextField from '../TextField';
import { EnhanceTodoStatus, Todo, TodoStatus } from '../../models/todo';
import reducer, { initialState } from '../../store/reducer';
import Service from '../../service';
import { createTodo, deleteAllTodos, deleteTodo, setTodos, toggleAllTodos, updateTodo } from '../../store/actions';
import Filter from './components/Filter';
import Checkbox from '../Checkbox';
import Item from './components/Item';
import Icon from '../Icon';

const ToDoPage = () => {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const [selectAll, setSelectAll] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const todos = Object.values(state.todos);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && inputRef.current) {
        try {
          console.log('dispatch', inputRef.current.value);
          const resp = await Service.createTodo(inputRef.current.value);
          dispatch(createTodo(resp));
          inputRef.current.value = '';
        } catch (e) {
          if (e.response.status === 401) {
            history.push('/');
          }
        }
      }
    },
    [history]
  );

  const onUpdateTodo = (todo: Todo) => {
    dispatch(updateTodo(todo));
  };

  const onToggleAllTodo = (checked: boolean) => {
    setSelectAll(checked);
    dispatch(toggleAllTodos(checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const onDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const showTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (showing) {
        case TodoStatus.ACTIVE:
          return todo.status === TodoStatus.ACTIVE;
        case TodoStatus.COMPLETED:
          return todo.status === TodoStatus.COMPLETED;
        default:
          return true;
      }
    });
  }, [todos, showing]);

  return (
    <div className={styles.Page}>
      <Header />
      <div className={styles.Content}>
        <div className={styles.Navigation}>
          <Link to="/">{'< Log out'}</Link>
        </div>

        <Filter value={showing} onChange={setShowing} />

        <TextField label="" placeholder="What need to be done?" onKeyDown={onCreateTodo} ref={inputRef} />

        {showTodos.length > 1 && (
          <div className={styles.ListHeading}>
            <Checkbox checked={selectAll} onChange={onToggleAllTodo} />
            <div className={styles.Spacing} />
            <div onClick={onDeleteAllTodo}>
              <Icon name="delete" color="danger" />
            </div>
          </div>
        )}

        <div className={styles.List}>
          {showTodos.map((todo) => (
            <Item key={todo.id} todo={todo} onChange={onUpdateTodo} onDelete={onDeleteTodo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToDoPage;
