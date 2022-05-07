import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToDoPage from '../../ToDoPage';

describe('Active/complete todos', () => {
  afterEach(cleanup);

  it('Should allow users to click on checkbox items they have completed', async () => {
    const user = userEvent.setup();
    render(<ToDoPage />);
    const todoCheckbox = await screen.findByLabelText('todo-item-checkbox');
    await user.click(todoCheckbox);
    expect(todoCheckbox).toBeChecked();
  })

  it('Should allow users to toggle all todos', async () => {
    const user = userEvent.setup();
    render(<ToDoPage />);
    const toggleAllTodoCheckbox = await screen.findByLabelText('toggle-all-todos');
    const individualsTodoCheckboxes = await screen.findAllByLabelText('todo-item-checkbox');
    await user.click(toggleAllTodoCheckbox);
    expect(toggleAllTodoCheckbox).toBeChecked();
    individualsTodoCheckboxes.forEach(checkbox => {
      expect(checkbox).toBeChecked();
    })
  })
})
