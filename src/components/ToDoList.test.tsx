import React from 'react'
import { render } from '@testing-library/react';

import ToDoList from './ToDoList';
import {Todo, TodoStatus} from '../models/todo';

const mockTodos: Todo[] = [{
  id: '00001',
  user_id: 'firstuser',
  content : 'todo1',
  status: TodoStatus.ACTIVE,
  created_date: '01/01/2021'
}]

test('todo1 have in todo list', () => {
  const {getByText, getByLabelText} = render(
    <ToDoList todos={mockTodos} showing={TodoStatus.ACTIVE} action={() => {}} />
  );
  expect(getByText('todo1')).toBeInTheDocument();
  expect(getByLabelText('todo1')).not.toBeChecked();
});