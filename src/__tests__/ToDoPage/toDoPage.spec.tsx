import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import ToDoPage from '../../ToDoPage';

describe('Render ToDoPage', () => {
  afterEach(cleanup);

  it('Should render a textbox', async () => {
    render(<ToDoPage />);
    const inputPlaceholder = await screen.findByPlaceholderText(
      /what need to be done?/i
    );
    expect(inputPlaceholder).toBeInTheDocument();
  })

  it('Should render "Clear all todos" button', async () => {
    render(<ToDoPage />);
    const clearButton = await screen.findByText(/clear all todos/i);
    expect(clearButton).toBeInTheDocument();
  })

  it('Should get todos from localStorage', async () => {
    const spyGetIteam = jest.spyOn(Storage.prototype, 'getItem');
    render(<ToDoPage />);
    await waitFor(() => expect(spyGetIteam).toHaveBeenCalled());
  })
})
