import React from 'react';
import ToDoPage from './ToDoPage';
import { config } from 'react-transition-group';
import userEvent from '@testing-library/user-event';
import { AppProvider } from '../../context/toDoContext';
import { render, screen } from '@testing-library/react';
// Disabled waits in Transistion
config.disabled = true;

describe('Create todos', () => {
  it('Should allow to create three todos', async () => {
    const user = userEvent.setup();
    render(<ToDoPage />, { wrapper: AppProvider });

    const toDos = ['item1', 'item2', 'item3'];
    for (let i = 0; i < toDos.length; i++) {
      await user.keyboard(`${toDos[i]}{Enter}`);
      expect(
        screen.getByText(toDos[i], { selector: 'span' }),
      ).toBeInTheDocument();
    }

    const todoItems = await screen.findAllByText(/item/i, { selector: 'span' });
    expect(todoItems).toHaveLength(toDos.length);
  });

  it('Should save new todos to localStorage', async () => {
    const user = userEvent.setup();
    const spySetItem = jest.spyOn(Storage.prototype, 'setItem');
    render(<ToDoPage />, { wrapper: AppProvider });

    const todoInput = screen.getByPlaceholderText(/what need to be done?/i);
    todoInput.focus();
    await user.keyboard('test persistance to-dos{Enter}');
    expect(spySetItem).toHaveBeenCalled();
  });
});
