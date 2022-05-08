import React from 'react';
import ToDoPage from './ToDoPage';
import { config } from 'react-transition-group';
import userEvent from '@testing-library/user-event';
import * as storage from '../../utils/localStorage';
import * as mojs from '../../utils/mojs';
import { AppProvider } from '../../context/toDoContext';
import { render, screen } from '@testing-library/react';
import { defaultToDos, forTestingDeleteTodos } from './mockData';
// Disabled waits in Transistion
config.disabled = true;

describe('ToDoToolbar', () => {
  it('Should allow users to toggle all todos', async () => {
    jest
      .spyOn(storage, 'getToDosFromLocalStorage')
      .mockReturnValue(defaultToDos);
    jest.spyOn(mojs, 'playCheckedEffect').mockImplementation(() => null);
    const user = userEvent.setup();
    render(<ToDoPage />, { wrapper: AppProvider });

    const toggleAllToDosCheckbox = await screen.findByLabelText(
      'toggle-all-todos',
    );
    const individualsToDoCheckboxes = await screen.findAllByLabelText(
      'todo-item-checkbox',
    );
    await user.click(toggleAllToDosCheckbox);

    expect(toggleAllToDosCheckbox).toBeChecked();
    individualsToDoCheckboxes.forEach(checkbox => {
      expect(checkbox).toBeChecked();
    });
  });

  it('Should allow users to clear all todos', async () => {
    jest
      .spyOn(storage, 'getToDosFromLocalStorage')
      .mockReturnValue(forTestingDeleteTodos);
    const user = userEvent.setup();
    render(<ToDoPage />, { wrapper: AppProvider });
    const clearAllToDosButton = await screen.findByText(/Clear all todos/i);
    await user.click(clearAllToDosButton);

    expect(() => screen.getAllByLabelText(/todo-item-checkbox/i)).toThrow(
      'Unable to find a label with the text of: /todo-item-checkbox/i',
    );
  });
});
