import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToDoPage from '../../ToDoPage';

describe('Create to-dos', () => {
  const user = userEvent.setup();

  it('Should display a list of to-do items', async () => {
    render(<ToDoPage />);
    
    const todoInput = screen.getByPlaceholderText(/what need to be done?/i);
    todoInput.focus()
    const toDos = ['first item', 'second item', 'third item'];
    for (let i = 0; i < toDos.length; i++) {
      await user.keyboard(`${toDos[i]}{Enter}`);
      expect(screen.getByText(toDos[i])).toBeInTheDocument();
    }

    const todoItems = await screen.findAllByText(/item/i, { selector: 'span' });
    expect(todoItems).toHaveLength(toDos.length);
  })

  it('Should save new todos to localStorage', async () => {
    const spySetItem = jest.spyOn(Storage.prototype, 'setItem');
    render(<ToDoPage />);
    
    const todoInput = screen.getByPlaceholderText(/what need to be done?/i);
    todoInput.focus()
    await user.keyboard(`test persistance to-dos{Enter}`);
    expect(spySetItem).toHaveBeenCalled();
    spySetItem.mockReset()
  })
})
