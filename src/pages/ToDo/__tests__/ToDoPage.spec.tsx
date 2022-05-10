import React from 'react';
import ToDoPage from '../ToDoPage';
import { config } from 'react-transition-group';
import * as storage from '../../../utils/localStorage';
import { AppProvider } from '../../../context/toDoContext';
import { fireEvent, render, screen } from '@testing-library/react';
import { spawnToDos } from '../utils';
import userEvent from '@testing-library/user-event';

// Disabled waits in Transistion
config.disabled = true;

jest.mock('@mojs/core');
jest.mock('../../../utils/mojs', () => ({
  __esModule: true,
  playCheckedEffect: jest.fn().mockImplementation(() => null),
}));

let spySaveToLocalStorage = jest.spyOn(storage, 'saveToLocalStorage');
let spyGetToDosFromLocalStorage = jest.spyOn(
  storage,
  'getToDosFromLocalStorage',
);

afterEach(() => {
  spySaveToLocalStorage.mockReset();
  spySaveToLocalStorage.mockRestore();
  spyGetToDosFromLocalStorage.mockReset();
  spyGetToDosFromLocalStorage.mockRestore();
});

describe('ToDoPage', () => {
  it('Should match snapshot', () => {
    const { container } = render(<ToDoPage />);
    expect(container).toMatchSnapshot();
  });
});

describe('Render ToDoPage', () => {
  it('Should have default todo on first load', async () => {
    const todos = spawnToDos(1);
    spyGetToDosFromLocalStorage.mockReturnValue(todos);
    const { findAllByTestId } = render(<ToDoPage />, { wrapper: AppProvider });
    const toDoItems = await findAllByTestId(/todo-item/i);

    expect(toDoItems).toHaveLength(todos.length);
  });
});

describe('Create todos', () => {
  it('Should allow to create three todos', async () => {
    const user = userEvent.setup();
    render(<ToDoPage />, { wrapper: AppProvider });

    const toDos = ['item1', 'item2', 'item3'];
    for (let i = 0; i < toDos.length; i++) {
      await user.keyboard(`${toDos[i]}{Enter}`);
      expect(
        await screen.findByText(toDos[i], { selector: 'span' }),
      ).toBeInTheDocument();
    }

    const todoItems = await screen.findAllByText(/item/i, { selector: 'span' });
    expect(todoItems).toHaveLength(toDos.length);
  });

  it('Should save new todos to localStorage', async () => {
    const user = userEvent.setup();
    render(<ToDoPage />, { wrapper: AppProvider });
    const todoInput = await screen.findByPlaceholderText(
      /what need to be done?/i,
    );
    todoInput.focus();
    await user.keyboard('test persistance to-dos{Enter}');
    const todoItems = await screen.findByText(/test persistance to-dos/i, {
      selector: 'span',
    });

    expect(todoItems).toBeInTheDocument();
  });
});

describe('Edit todo', () => {
  it('Should allow edit todo by double click on it', async () => {
    const { findByText } = render(<ToDoPage />, { wrapper: AppProvider });
    const defaultToDo = await findByText(/content/i, {
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
  });

  it('Should discard change when clicking outside', async () => {
    const { findByText } = render(<ToDoPage />, { wrapper: AppProvider });

    const defaultTodo = await findByText(/content/i, {
      selector: 'span',
    });

    // Change todo content and click outside
    fireEvent.blur(defaultTodo, { target: { textContent: 'discard edit' } });

    expect(spySaveToLocalStorage).not.toHaveBeenCalled();
  });
});

describe('Active/complete todo', () => {
  it('Should allow users to click on checkbox items they have completed', async () => {
    const user = userEvent.setup();
    spyGetToDosFromLocalStorage.mockReturnValue(spawnToDos(2));
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

describe('ToDoToolbar', () => {
  it('Should allow users to toggle all todos', async () => {
    const user = userEvent.setup();
    const { findByLabelText, findAllByLabelText } = render(<ToDoPage />, {
      wrapper: AppProvider,
    });

    const toggleAllToDosCheckbox = await findByLabelText('toggle-all-todos');
    const individualsToDoCheckboxes = await findAllByLabelText(
      'todo-item-checkbox',
    );
    await user.click(toggleAllToDosCheckbox);

    expect(toggleAllToDosCheckbox).toBeChecked();
    individualsToDoCheckboxes.forEach(checkbox => {
      expect(checkbox).toBeChecked();
    });
  });

  it('Should allow users to clear all todos', async () => {
    const user = userEvent.setup();
    render(<ToDoPage />, { wrapper: AppProvider });
    const clearAllToDosButton = await screen.findByText(/Clear all todos/i);
    await user.click(clearAllToDosButton);

    expect(() => screen.getAllByLabelText(/todo-item-checkbox/i)).toThrow(
      'Unable to find a label with the text of: /todo-item-checkbox/i',
    );
  });

  it('Should be able to select filter selection', async () => {
    const user = userEvent.setup();
    render(<ToDoPage />);
    await user.selectOptions(screen.getByRole('combobox'), 'All');
    const allOption = screen.getByRole('option', {
      name: 'All',
    }) as HTMLOptionElement;

    expect(allOption.selected).toBe(true);

    await user.selectOptions(screen.getByRole('combobox'), 'Active');
    const activeOption = screen.getByRole('option', {
      name: /active/i,
    }) as HTMLOptionElement;

    expect(activeOption.selected).toBe(true);

    await user.selectOptions(screen.getByRole('combobox'), 'Completed');
    const completedOption = screen.getByRole('option', {
      name: /completed/i,
    }) as HTMLOptionElement;

    expect(completedOption.selected).toBe(true);
  });
});
