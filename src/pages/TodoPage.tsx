import React, { memo, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';

import reducer, { initialState } from '../store/reducer';
import {
  setTodos,
  toggleAllTodos,
  createTodo,
} from '../store/action-creators';
import Service from '../service';
import { TodoStatus } from '../models/todo';
import { getTodoStatus, isTodoActive, isTodoCompleted } from '../utils';

import TodoList from 'components/TodoList';
import Input from 'components/Input';
import Checkbox from 'components/Checkbox';
import TodoToolBar from 'components/TodoToolbar';

import styles from "./TodoPage.module.scss";

type EnhanceTodoStatus = TodoStatus | 'ALL';

const TodoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const resp = await Service.getTodos();
        dispatch(setTodos(resp || []));
      } catch (error) {
        alert(error)
      }
    })()
  }, [])

  const onCreateTodo = useCallback(async (e: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (e.key === 'Enter' && inputRef.current) {
      const value = inputRef.current.value;
      if (!value) return; // do nothing if empty value
      try {
        const resp = await Service.createTodo(value);
        dispatch(createTodo(resp));
        inputRef.current.value = '';
      } catch (error) {
        alert(error)
      }
    }
  }, [])

  const onToggleAllTodo = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(toggleAllTodos(getTodoStatus(e.target.checked)))
  }, [])

  const showTodos = useMemo(() => [...todos].filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return isTodoActive(todo.status);
      case TodoStatus.COMPLETED:
        return isTodoCompleted(todo.status);
      default:
        return true;
    }
  }), [showing, todos]);

  const activeTodos = useMemo(() => [...todos].reduce(function (accum, todo) {
    return isTodoCompleted(todo.status) ? accum : accum + 1;
  }, 0), [todos]);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        { todos.length > 0 &&
          <Checkbox 
            checked={activeTodos === 0}
            onChange={onToggleAllTodo}
          />
        }
        <Input 
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
          ref={inputRef} 
        />
      </div>
      { showTodos.length > 0 &&
        <TodoList 
          items={showTodos} 
          dispatch={dispatch}
        />
      }
      { todos.length > 0 &&
        <TodoToolBar 
          onTabClick={setShowing} 
          dispatch={dispatch}
          active={showing}
          activeTodos={activeTodos}
        />
      }
      <span className={styles.guide}>Double-click to edit a todo</span>
    </div>
  );
};

export default memo(TodoPage);