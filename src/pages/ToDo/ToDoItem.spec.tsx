import React from 'react';
import ToDoPage from './ToDoPage';
import { config } from 'react-transition-group';
import userEvent from '@testing-library/user-event';
import { AppProvider } from '../../context/toDoContext';
import { fireEvent, render, screen } from '@testing-library/react';
import * as mojs from '../../utils/mojs';
import * as actions from '../../store/actions';
import * as storage from '../../utils/localStorage';
import { defaultToDos } from './mockData';
// Disabled waits in Transistion
config.disabled = true;

beforeEach(() =>
  jest.spyOn(storage, 'getToDosFromLocalStorage').mockReturnValue(defaultToDos),
);

describe('Edit todo', () => {
  it('Should allow edit todo by double click on it', async () => {
    const spyUpdateToDoContent = jest.spyOn(actions, 'updateTodoContent');
    render(<ToDoPage />, { wrapper: AppProvider });
    const defaultToDo = await screen.findByText(/content/i, {
      selector: 'span',
    });

    // await user.dblClick(defaultToDo); not woking
    // https://stackoverflow.com/questions/60495903/testing-react-contenteditable-with-react-testing-library
    // Workaround: https://github.com/testing-library/dom-testing-library/pull/235
    // Mimic user typing action
    fireEvent.blur(defaultToDo, { target: { textContent: 'edit content' } });
    defaultToDo.dispatchEvent(
      new KeyboardEvent('keydown', {
        bubbles: true,
        key: 'Enter',
      }),
    );

    const updateTodo = await screen.findByText(/edit content/i, {
      selector: 'span',
    });

    expect(updateTodo).toBeInTheDocument();
    expect(spyUpdateToDoContent).toHaveBeenCalled();
  });

  it('Should discard change when clicking outside', async () => {
    // Due user.dblclick() not working on contenteditable, we have to track the updateToDoContent
    // to see if it get invoked or not. Here we expect it to not be invoked.
    const spyUpdateTodoContent = jest.spyOn(actions, 'updateTodoContent');
    render(<ToDoPage />, { wrapper: AppProvider });
    const defaultTodo = await screen.findByText(/content/i, {
      selector: 'span',
    });

    // Change todo content and click outside
    fireEvent.blur(defaultTodo, { target: { textContent: 'discard edit' } });

    expect(spyUpdateTodoContent).not.toHaveBeenCalled();
  });
});

describe('Active/complete todo', () => {
  it('Should allow users to click on checkbox items they have completed', async () => {
    jest.spyOn(mojs, 'playCheckedEffect').mockImplementation(() => null);
    const user = userEvent.setup();
    render(<ToDoPage />, { wrapper: AppProvider });

    const todoCheckboxs = await screen.findAllByLabelText('todo-item-checkbox');
    await user.click(todoCheckboxs[0]);

    expect(todoCheckboxs[0]).toBeChecked();
  });
});

describe('Delete todo', () => {
  it('Should allow users to delete a single todo', async () => {
    const user = userEvent.setup();
    render(<ToDoPage />, { wrapper: AppProvider });

    const deleteButtons = await screen.findAllByLabelText('delete-todo-button');
    await user.click(deleteButtons[0]);

    expect(deleteButtons[0]).not.toBeInTheDocument();
  });
});
