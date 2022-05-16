import { Button, Grid } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import { Todo, TodoStatus } from '../../models/todo';
import { useAppDispatch, useAppselector } from '../../store';
import { isTodoActive, isTodoCompleted } from '../../utils';

import { actions, selectors } from './duck';
import TodoItem from './components/TodoItem';
import TodoList from './components/TodoList';
import TodoActions from './components/TodoActions';

enum TabAll {
  ALL = 'ALL',
}
export const TabHeader = {
  ...TodoStatus,
  ...TabAll,
};
type TabHeader = TodoStatus | TabAll;

const TodoPage = () => {
  const dispatch = useAppDispatch();
  const todos: Todo[] = useAppselector(selectors.selectTodo);

  const [showing, setShowing] = useState<TabHeader>(TabHeader.ALL);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    dispatch(actions.getTodos());
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef?.current?.value !== '') {
      dispatch(actions.createTodo(inputRef.current.value));
      inputRef.current.value = '';
    }
  };

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    dispatch(actions.updateTodoStatus({ todoId, checked: e.target.checked }));
  };

  const onUpdateTodoContent = (content: string, todoId: string) => {
    dispatch(actions.onUpdateTodoContent({ content, todoId }));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(actions.deleteAllTodos());
  };

  const onDeleteTodo = (todoId: string) => {
    dispatch(actions.deleteTodo(todoId));
  };

  const handleTodoFilter = (todoItem: Todo) => {
    if (showing === TabHeader.ALL) return true;
    if (showing === TabHeader.ACTIVE) return isTodoActive(todoItem);
    if (showing === TabHeader.COMPLETED) return isTodoCompleted(todoItem);
  };

  return (
    <div className='Todo__container'>
      <div className='Todo__creation'>
        <input
          ref={inputRef}
          className='Todo__input'
          placeholder='What need to be done?'
          onKeyDown={onCreateTodo}
        />
      </div>
      <TodoActions
        todos={todos}
        showing={showing}
        setShowing={setShowing}
        onDeleteAllTodo={onDeleteAllTodo}
        onToggleAllTodo={onToggleAllTodo}
      />
      <TodoList
        todos={todos.filter(handleTodoFilter)}
        onUpdateTodoStatus={onUpdateTodoStatus}
        onDeleteTodo={onDeleteTodo}
        onUpdateTodoContent={onUpdateTodoContent}
      />
    </div>
  );
};

export default TodoPage;
