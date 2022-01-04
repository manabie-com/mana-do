import React from 'react';
import ToDoPage from '../../ToDoPage';
import { fireEvent, waitFor } from '@testing-library/dom';
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
    userEvent.type(todoInput, 'My work');
    fireEvent.keyDown(todoInput, {
      keyCode: 13,
    });

    await waitFor(() => {
      const todoItem = queryByText(/my work/i);
      expect(todoItem).toBeTruthy();
    });
  });

  it('should remove the correct item if the user delete it', async () => {
    const { queryByPlaceholderText, queryByText } = renderView();

    const todoInput = queryByPlaceholderText(/what need to be done?/i);
    userEvent.type(todoInput, 'My work');
    fireEvent.keyDown(todoInput, {
      keyCode: 13,
    });

    await waitFor(() => {
      const todoItem = queryByText(/my work/i);
      expect(todoItem).toBeTruthy();

      const deleteButton = queryByText(/x/i);
      fireEvent.click(deleteButton);
      expect(todoItem).not.toBeInTheDocument();
    });
  });

  it('should update the status to completed when toggled on the item', async () => {
    const { queryByPlaceholderText, getAllByRole, queryByRole } = renderView();

    const todoInput = queryByPlaceholderText(/what need to be done?/i);
    userEvent.type(todoInput, 'My work');
    fireEvent.keyDown(todoInput, {
      keyCode: 13,
    });

    await waitFor(() => {
      const allCheckboxes = getAllByRole('checkbox');
      const todoCheckbox = allCheckboxes[0];
      fireEvent.click(todoCheckbox);

      const activeButton = queryByRole('button', { name: /active/i });
      fireEvent.click(activeButton);

      expect(todoCheckbox).not.toBeInTheDocument();
    });
  });

  it('should be able to edit the todo item', async () => {
    const { queryByPlaceholderText, getByText, queryByRole } = renderView();

    const todoInput = queryByPlaceholderText(/what need to be done?/i);
    userEvent.type(todoInput, 'show edit');
    fireEvent.keyDown(todoInput, {
      keyCode: 13,
    });

    await waitFor(() => {
      const todoItems = getByText(/show edit/i);
      fireEvent.dblClick(todoItems);

      const inputItem = queryByRole('input', { value: /show edit/i });
      expect(todoItems).not.toBeInTheDocument();
      expect(inputItem).toBeInTheDocument();
    });
  });
});
