import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToDoPage from '../../ToDoPage';

describe('Delete todo', () => {
  it('Should allow users to delete a single todo', async () => {
    const user = userEvent.setup();
    render(<ToDoPage />);
    const deleteButton = await screen.findByLabelText('delete-todo-button');
    await user.click(deleteButton);
    expect(deleteButton).not.toBeInTheDocument();
  })
})
