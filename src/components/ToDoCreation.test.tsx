import React from 'react'
import { render, fireEvent } from '@testing-library/react';

import ToDoCreation from './ToDoCreation';

test('It should allow letters to be inputted', () => {
  const {getByLabelText} = render(<ToDoCreation action={() => {}} />)
  const input = getByLabelText('creation-input');
  fireEvent.change(input, {target: {value: 'todo2'}});
  expect(input.value).toBe('todo2');
});