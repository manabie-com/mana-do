import { Button, Grid } from '@mui/material';
import React from 'react';
import { Todo } from '../../../models/todo';
import { TabHeader } from '../TodoPage';

type TodoActionsProps = {
  todos: Todo[];
  showing: string;
  onDeleteAllTodo: () => void;
  onToggleAllTodo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShowing: (tab: any) => void;
};

const TodoActions = ({
  todos,
  showing,
  onToggleAllTodo,
  onDeleteAllTodo,
  setShowing,
}: TodoActionsProps) => {
  return (
    <Grid container justifyContent='space-between' data-testid='todo-actions'>
      <Grid>
        {todos.length > 0 ? (
          <input type='checkbox' onChange={onToggleAllTodo} data-testid='toggle-all' />
        ) : (
          <div />
        )}
      </Grid>
      <Grid>
        <Button
          data-testid='button-all'
          variant={showing === TabHeader.ALL ? 'outlined' : 'text'}
          onClick={() => setShowing(TabHeader.ALL)}
        >
          {TabHeader.ALL}
        </Button>
        <Button
          data-testid='button-active'
          variant={showing === TabHeader.ACTIVE ? 'outlined' : 'text'}
          onClick={() => setShowing(TabHeader.ACTIVE)}
        >
          {TabHeader.ACTIVE}
        </Button>
        <Button
          data-testid='button-complete'
          variant={showing === TabHeader.COMPLETED ? 'outlined' : 'text'}
          onClick={() => setShowing(TabHeader.COMPLETED)}
        >
          {TabHeader.COMPLETED}
        </Button>
      </Grid>
      <Grid>
        <Button data-testid='button-clear-all' variant='contained' onClick={onDeleteAllTodo}>
          Clear all
        </Button>
      </Grid>
    </Grid>
  );
};

export default TodoActions;
