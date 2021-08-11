import React from 'react';
import {cleanup, render, screen, within} from '@testing-library/react';
import ToDoItem from '../index';

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('Todo render correct content', () => {
  const onSelect = (e: any, item: any) => {
    console.log(item)
  }

  const onDelete = () => {

  }

  const onSelectEditTodo = () => {

  }

  const {getByTestId} = render(<ToDoItem todo={{content: 'Todo Test', id: 'abc', user_id: 'bde', created_date: new Date()}}
                   onSelect={onSelect} onDelete={onDelete} onSelectEditTodo={onSelectEditTodo}
  />);

  const {getByText} = within(getByTestId('todo-content'))
  expect(getByText('Todo Test')).toBeInTheDocument();
});
