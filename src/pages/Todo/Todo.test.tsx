import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TodoPage from './index';
import { Todo } from '../../models/todo';
import userEvent from '@testing-library/user-event';

it('should show existing todos', function () {
  const { getByText } = render(<TodoPage />);
  const localTodos = localStorage.getItem('todos');
  console.log(localTodos);
  const todos = localTodos ? JSON.parse(localTodos) : [];

  if (todos.length) {
    todos.forEach((t: Todo) => {
      expect(getByText(t.content)).toBeInTheDocument();
    });
  }
});

it('should add new todo', function () {
  const utils = render(<TodoPage />);
  const input = utils.getByPlaceholderText('What need to be done?');

  if (input) {
    userEvent.type(input, 'New todo');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(screen.getByDisplayValue('New todo')).toBeInTheDocument();
  }
});
