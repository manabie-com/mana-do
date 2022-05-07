import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToDoPage from '../../ToDoPage';
import * as utils from '../../utils/localStorage';
import { Todo, TodoStatus } from '../../models/todo';

const mockTodosData = [
  {
    content: 'Content',
    created_date: new Date().toISOString(),
    status: TodoStatus.ACTIVE,
    id: 'testid',
    user_id: "firstUser",
  } as Todo
];


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
    jest.spyOn(utils, 'getAllToDosStatus').mockReturnValue(TodoStatus.COMPLETED);
    jest.spyOn(utils, 'getToDosFromLocalStorage').mockReturnValue(mockTodosData);

    const user = userEvent.setup();
    render(<ToDoPage />);

    const toggleAllTodosCheckbox = await screen.findByLabelText('toggle-all-todos');
    const individualsTodoCheckboxes = await screen.findAllByLabelText('todo-item-checkbox');
    
    await user.click(toggleAllTodosCheckbox);
    expect(toggleAllTodosCheckbox).not.toBeChecked();
    individualsTodoCheckboxes.forEach(checkbox => {
      expect(checkbox).not.toBeChecked();
    })
  })
})
