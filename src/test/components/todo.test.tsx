import React from 'react';
import { render } from '@testing-library/react';
import TodoPage from 'root/containers/ToDoPage';

import { createLocation, createBrowserHistory } from 'history';
import { match } from 'react-router';

const history = createBrowserHistory()
const location = createLocation('/todo')
const todoMatch: match<{ id: string }> = {
  isExact: false,
  path: '/todo',
  url: 'localhost:3000/todo',
  params: { id: 'todo' }
}

test('renders all button', () => {
  const { getByText } = render(<TodoPage 
    history={history}
    location={location}
    match={todoMatch}
  />);
  const buttonCompleted = getByText(/Completed/i);
  const buttonClearAll = getByText(/Clear all todos/i);
  const buttonActive = getByText(/Active/i);
  expect(buttonCompleted).toBeInTheDocument();
  expect(buttonClearAll).toBeInTheDocument();
  expect(buttonActive).toBeInTheDocument();
});
