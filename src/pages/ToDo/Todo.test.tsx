import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import ToDoPage from '.';

describe('Test Create Todo', () => {
  const todos = [
    'Buy ingredients',
    'Cook food',
    'Eat'
  ]

  test.each(todos)('Create todo', async (todo) => {
    const { getByText, getByTestId } = render(<ToDoPage />);
    const todoInput = screen.queryByPlaceholderText(/What needs to be done?/);
    expect(todoInput).not.toBeNull();

    const todoForm = getByTestId("form-create-todo");
    expect(todoForm).not.toBeNull();

    if (todoInput) {
      fireEvent.change(todoInput, { target: { value: todo } });
      await act(async () => {
        fireEvent.submit(todoForm);
      });
    }
    getByText(todo);
  });
});

describe('Test todo management', () => {
  const todos = [
    'Buy ingredients',
    'Cook food',
    'Eat'
  ]
  beforeEach(async () => {
    const { getByTestId } = render(<ToDoPage />);
    const todoInput = screen.queryByPlaceholderText(/What needs to be done?/);
    const todoForm = getByTestId("form-create-todo");

    await act(async () => {
      todos.forEach(async (todo) => {
        if (todoInput) {
          fireEvent.change(todoInput, { target: { value: todo } });
          fireEvent.submit(todoForm);
        }
      });
    })
  });

  test.each(todos)('Update todo', async (todo) => {
    const todoItem = screen.getByText(todo).parentNode?.parentNode;
    expect(todoItem).not.toBeNull();
    await act(async () => {
      if (todoItem) fireEvent.click(todoItem, ({ detail: 2 })); // Simulate a double click
    })
    const todoInput = screen.getByPlaceholderText('Enter new todo...');
    fireEvent.change(todoInput, { target: { value: `Updated ${todo}` } });
    const todoUpdateForm = screen.getByTestId('form-update-todo');
    await act(async () => {
      fireEvent.submit(todoUpdateForm);
    });
    const updatedTodoItem = screen.getByText(`Updated ${todo}`);
    expect(updatedTodoItem).not.toBeNull();
  })

  test('Remove todo', async () => {
    const btnRemoveList = screen.getAllByRole('button', {
      name: /Remove/
    });
    expect(btnRemoveList).not.toBeNull();
    expect(btnRemoveList.length).toEqual(todos.length);

    await act(async () => {
      btnRemoveList.forEach(async (btnRemove) => {
        fireEvent.click(btnRemove);
      })
    })

    const textWarning = screen.queryByText('You do not have any todos yet!');
    expect(textWarning).not.toBeNull();
  })
})