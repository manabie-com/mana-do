import { Button, Grid } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import { Todo, TodoStatus } from '../../models/todo';
import { useAppDispatch, useAppselector } from '../../store';
import { isTodoActive, isTodoCompleted } from '../../utils';

import { actions, selectors } from './duck';
import TodoItem from './components/TodoItem';

enum TabAll {
  ALL = 'ALL',
}
const TabHeader = {
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
    if (showing === 'ALL') return true;
    if (showing === TodoStatus.ACTIVE) return isTodoActive(todoItem);
    if (showing === TodoStatus.COMPLETED) return isTodoCompleted(todoItem);
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

      <Grid container justifyContent='space-between'>
        <Grid>
          {todos.length > 0 ? <input type='checkbox' onChange={onToggleAllTodo} /> : <div />}
        </Grid>
        <Grid>
          <Button
            variant={showing === TabHeader.ALL ? 'outlined' : 'text'}
            onClick={() => setShowing(TabHeader.ALL)}
          >
            {TabHeader.ALL}
          </Button>
          <Button
            variant={showing === TabHeader.ACTIVE ? 'outlined' : 'text'}
            onClick={() => setShowing(TabHeader.ACTIVE)}
          >
            {TabHeader.ACTIVE}
          </Button>
          <Button
            variant={showing === TabHeader.COMPLETED ? 'outlined' : 'text'}
            onClick={() => setShowing(TabHeader.COMPLETED)}
          >
            {TabHeader.COMPLETED}
          </Button>
        </Grid>
        <Grid>
          <Button variant='contained' onClick={onDeleteAllTodo}>
            Clear all
          </Button>
        </Grid>
      </Grid>

      <div className='Todo__list'>
        {todos.filter(handleTodoFilter).map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdateTodoStatus={onUpdateTodoStatus}
            onDeleteTodo={onDeleteTodo}
            onUpdateTodoContent={onUpdateTodoContent}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoPage;
