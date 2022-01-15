import React, { memo, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';

import reducer, { initialState } from '../store/reducer';
import {
  setTodos,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  deleteTodo,
  createTodo,
  updateTodoContent,
} from '../store/action-creators';
import Service from '../service';
import { TodoStatus } from '../models/todo';
import { isTodoCompleted } from '../utils';

import TodoList from 'components/TodoList';
import Input from 'components/Input';

import styles from "./TodoPage.module.scss";
import Checkbox from 'components/Checkbox';
import TodoToolBar from 'components/TodoToolbar';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const TodoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })()
  }, [])

  const onCreateTodo = useCallback(async (e: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (e.key === 'Enter' && inputRef.current) {
      const value = inputRef.current.value;
      if (!value) return; // do nothing if empty value
      const resp = await Service.createTodo(value);
      dispatch(createTodo(resp));
      inputRef.current.value = '';
    }
  }, [])

  const onToggleAllTodo = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(toggleAllTodos(e.target.checked))
  }, [])

  const onUpdateTodoStatus = useCallback((id: string, checked: boolean): void => {
    dispatch(updateTodoStatus(id, checked))
  }, [])

  const onUpdateTodoContent = useCallback((id: string, content: string): void => {
    dispatch(updateTodoContent(id, content))
  }, [])

  const onDeleteTodo = useCallback((id: string): void => {
    dispatch(deleteTodo(id));
  }, []) 

  const onDeleteAllTodo = useCallback((): void => {
    dispatch(deleteAllTodos());
  }, [])

  const showTodos = useMemo(() => [...todos].filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
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
          onUpdateTodoStatus={onUpdateTodoStatus}
          onDeleteTodo={onDeleteTodo}
          onUpdateTodoContent={onUpdateTodoContent}
        />
      }
      { todos.length > 0 &&
        <TodoToolBar 
          onTabClick={setShowing} 
          onClearAll={onDeleteAllTodo}
          active={showing}
          activeTodos={activeTodos}
        />
      }
      <span className={styles.guide}>Double-click to edit a todo</span>
    </div>
  );
};

export default memo(TodoPage);