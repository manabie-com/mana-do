import React from 'react'
import { render } from '@testing-library/react';

import ToDoToolbar from './ToDoToolbar';

test('It should have All, Active, Completed, Clear all todos button', () => {
  const {getByText} = render(<ToDoToolbar todos={[]} action={() => {}} updateShowing={() => {}} />)
  const inputAll = getByText('All');
  const inputActive = getByText('Active');
  const inputCompleted = getByText('Completed');
  const inputClearAll = getByText('Clear all todos');
  expect(inputAll).toBeInTheDocument();
  expect(inputActive).toBeInTheDocument();
  expect(inputCompleted).toBeInTheDocument();
  expect(inputClearAll).toBeInTheDocument();
});