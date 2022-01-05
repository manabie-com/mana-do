import React from 'react';
import ToDoPage from '../../ToDoPage';
import {fireEvent, waitFor} from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const renderView = () => render(<ToDoPage />);

describe('Todo Page', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...process.env,
      REACT_APP_WHOAMI: 'frontend',
    };
  });

  it('should toggle the checkbox if the current tab is active', async () => {
    const { queryByPlaceholderText, getAllByRole, getByRole } = renderView();

    /* stimulate the action of user by creating an todo item */
    const todoInput = queryByPlaceholderText(/what need to be done?/i);
    userEvent.type(todoInput, 'My work');
    fireEvent.keyDown(todoInput, {
      keyCode: 13,
    });

    await waitFor(() => {
      const allCheckboxes = getAllByRole('checkbox');
      const checkboxAll = allCheckboxes[allCheckboxes.length - 1];

      const activeButton = getByRole('button', { name: /active/i });

      userEvent.click(activeButton);

      expect(checkboxAll).toHaveProperty('checked', false);
    });
  });

  it('should create a single todo item when user input and press enter', async () => {
    const { queryByPlaceholderText, queryByText } = renderView();

    const todoInput = queryByPlaceholderText(/what need to be done?/i);
    userEvent.type(todoInput, 'Press enter');
    fireEvent.keyDown(todoInput, {
      keyCode: 13,
    });

    await waitFor(() => {
      const todoItem = queryByText(/press enter/i);
      expect(todoItem).toBeTruthy();
    });
  });

  it('should remove the correct item if the user delete it', async () => {
    const { queryByPlaceholderText, queryAllByText, queryByText } = renderView();

    const todoInput = queryByPlaceholderText(/what need to be done?/i);
    userEvent.type(todoInput, 'Delete item');
    fireEvent.keyDown(todoInput, {
      keyCode: 13,
    });

    await waitFor(() => {
      const todoItem = queryByText(/delete item/i);

      const deleteButtons = queryAllByText(/x/i);
      const todoDeleteButton = deleteButtons[deleteButtons.length - 1];
      fireEvent.click(todoDeleteButton);
      expect(todoItem).not.toBeInTheDocument();
    });
  });

  it('should be able to edit and update the todo item', async () => {
    const { queryByPlaceholderText, queryByText, getAllByRole } = renderView();

    const todoInput = queryByPlaceholderText(/what need to be done?/i);
    userEvent.type(todoInput, 'show input');
    fireEvent.keyDown(todoInput, {
      keyCode: 13,
    });

    await waitFor(() => {
      const todoItem = queryByText(/show input/i);
      fireEvent.dblClick(todoItem);
    });

    await waitFor(async () => {
      const inputItem = queryByPlaceholderText(/todo/i);

      userEvent.type(inputItem, '123');
      fireEvent.keyDown(inputItem, {
        key: 'Enter',
        keyCode: 13,
      });

      await waitFor(() => {
        const updatedTodo = queryByText(/show input/i);
        expect(updatedTodo).not.toBeInTheDocument();
      });
    });
  });

  it('should be discard if the user click outside', async () => {
    const { queryByPlaceholderText, queryByText } = renderView();

    const todoInput = queryByPlaceholderText(/what need to be done?/i);
    userEvent.type(todoInput, 'discard update');
    fireEvent.keyDown(todoInput, {
      keyCode: 13,
    });

    await waitFor(() => {
      const currentTodo = queryByText(/discard update/i);
      fireEvent.dblClick(currentTodo);
    });

    await waitFor(() => {
      const inputItem = queryByPlaceholderText(/todo/i);
      userEvent.type(inputItem, 'update new value');

      fireEvent.blur(inputItem);
    });

    await waitFor(() => {
      const updatedTodo = queryByText(/discard update/i);
      expect(updatedTodo).toBeInTheDocument();
    });
  });

  it('should update the status to completed when toggled on the item', async () => {
    const { queryByPlaceholderText, getAllByRole, queryByRole } = renderView();

    const todoInput = queryByPlaceholderText(/what need to be done?/i);
    userEvent.type(todoInput, 'Update status');
    fireEvent.keyDown(todoInput, {
      keyCode: 13,
    });

    await waitFor(() => {
      const allCheckboxes = getAllByRole('checkbox');
      const todoCheckbox = allCheckboxes[0];
      fireEvent.click(todoCheckbox);

      const activeButton = queryByRole('button', { name: /active/i });
      fireEvent.click(activeButton);

      expect(allCheckboxes).toHaveLength(1);
    });
  });
});
