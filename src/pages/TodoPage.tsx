import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import clsx from "clsx";

import {
  toggleAllTodos,
  createTodo,
} from '../store/action-creators';
import Service from '../service';
import { TodoStatus } from '../models/todo';
import { getTodoStatus, isTodoActive, isTodoCompleted } from '../utils';
import usePersistReducer from 'hooks/usePersistReducer';

import TodoList from 'components/TodoList';
import Input from 'components/Input';
import Checkbox from 'components/Checkbox';
import TodoToolBar from 'components/TodoToolbar';
import ThemeSwitcher from 'components/ThemeSwitcher';

import styles from "./TodoPage.module.scss";
import "../styles/theme.scss";

type EnhanceTodoStatus = TodoStatus | 'ALL';

const TodoPage = () => {
  const [{ todos, theme }, dispatch] = usePersistReducer();
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const inputRef = useRef<HTMLInputElement>(null);

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
  }, [dispatch])

  const onToggleAllTodo = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(toggleAllTodos(getTodoStatus(e.target.checked)))
  }, [dispatch])

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
    <div className={clsx(styles.root, "theme", theme)}>
      <div className={styles.wrapper}>
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
        <ThemeSwitcher theme={theme} dispatch={dispatch}/>
      </div>
    </div>
  );
};

export default memo(TodoPage);