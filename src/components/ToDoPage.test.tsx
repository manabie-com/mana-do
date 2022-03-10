import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import ToDoPage from './ToDoPage';

test('Adding a todo', async () => {
    render(<ToDoPage />)
    fireEvent.change(screen.getByPlaceholderText('What need to be done?'), { target: { value: 'The first todo' } });
    fireEvent.keyDown(screen.getByPlaceholderText('What need to be done?'), { key: 'Enter', code: 'Enter', charCode: 13 });
    await waitFor(() => screen.getByText('The first todo'))

    expect(screen.getByText('The first todo')).toBeInTheDocument();
})