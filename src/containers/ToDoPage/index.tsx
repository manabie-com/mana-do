import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { Button } from 'components/Button';
import { Form } from './components/Form';
import { TodoList } from './components/TodoList';
import { actions, selectTodoIds } from './slice';
import { isLoggedIn } from 'utils/auth';

export function ToDoPage() {
  const todoIds = useSelector(selectTodoIds);
  const dispatch = useDispatch();

  const handleFilter = (filter: string) => () => {
    dispatch(actions.setFilter(filter));
  };

  const handleCompleteAll = () => {
    dispatch(actions.completeAllTodos());
  };

  const handleRemoveAll = () => {
    dispatch(actions.deleteAllTodos());
  };

  if (!isLoggedIn()) {
    return <Redirect to="/" />;
  }

  return (
    <Wrapper>
      <Form />

      <TodoList ids={todoIds} />

      <Actions>
        <Button onClick={handleFilter('ALL')}>Show all</Button>
        <Button onClick={handleFilter('ACTIVE')}>Show active</Button>
        <Button onClick={handleFilter('COMPLETED')}>Show completed</Button>
        <Button primary onClick={handleCompleteAll}>
          Complete all
        </Button>
        <Button primary onClick={handleRemoveAll}>
          Delete all
        </Button>
      </Actions>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  border: 1px solid rgba(34, 36, 38, 0.15);
  margin: 200px auto;
  max-width: 600px;
  padding: 16px;
  border-radius: 6px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`;
