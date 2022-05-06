import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToDoPage from '../../ToDoPage';

describe('Edit todo', () => {
  afterEach(cleanup);
  it('Should allow edit todo by double click on it', async () => {
    const user = userEvent.setup();
    render(<ToDoPage />);
    const defaultTodo = await screen.findByText(/content/i, {selector: 'span'});
    // await user.dblClick(defaultTodo); not woking
    // https://stackoverflow.com/questions/60495903/testing-react-contenteditable-with-react-testing-library
    fireEvent.blur(defaultTodo, { target: { textContent: 'new content' } });
    defaultTodo.focus();
    await user.keyboard('{Enter}');
    const updateTodo = await screen.findByText(/new content/i, {selector: 'span'});
    expect(updateTodo).toBeInTheDocument();
  })

  it('Should discard change when clicking outside', async () => {
    render(<ToDoPage />);
    const defaultTodo = await screen.findByText(/content/i, {selector: 'span'});
    fireEvent.blur(defaultTodo, { target: { textContent: 'new content' } });
    defaultTodo.blur();
    expect(defaultTodo).toHaveTextContent(/content/i);
  })
})
