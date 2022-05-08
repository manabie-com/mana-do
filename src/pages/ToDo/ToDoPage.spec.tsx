import React from 'react';
import ToDoPage from './ToDoPage';
import { config } from 'react-transition-group';
import * as storage from '../../utils/localStorage';
import { AppProvider } from '../../context/toDoContext';
import { render, screen } from '@testing-library/react';
import { defaultToDos } from './mockData';
// Disabled waits in Transistion
config.disabled = true;

it('Should have default todo on first load', async () => {
  jest.spyOn(storage, 'getToDosFromLocalStorage').mockReturnValue(defaultToDos);

  render(<ToDoPage />, { wrapper: AppProvider });
  const todoItems = await screen.findAllByLabelText(/delete-todo-button/i);

  expect(todoItems).toHaveLength(defaultToDos.length);
});
