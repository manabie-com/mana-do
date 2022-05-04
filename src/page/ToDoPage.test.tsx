import React from 'react'
import { render, screen } from '@testing-library/react';
import ToDoPage from './ToDoPage';
import userEvent from '@testing-library/user-event';

test('renders "isModalOpened" if the delete button was clicked', () => {
    // Arrange: set up the test data, test conditions and test environment
    render(<ToDoPage />);

    // Act: run logic that should be tested
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement)

    // Assert: compare execution results with expected result
    const outputElement = screen.getByText('Are you sure, you want to delete all todos?', { exact: false });
    expect(outputElement).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled()
});