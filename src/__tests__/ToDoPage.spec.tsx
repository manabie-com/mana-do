import React from 'react';
import { render, screen } from '@testing-library/react';
import ToDoPage from '../ToDoPage';

describe('Render ToDoPage', () => {
  beforeEach(() => {
    render(<ToDoPage />);
  })

  it('Should render a textbox', () => {
    const inputPlaceholder = screen.getByPlaceholderText(
      /what need to be done?/i
    );
    expect(inputPlaceholder).toBeInTheDocument();
  })

  it('Should render "All" button', () => {
    const allButton = screen.getByText(/All/, { selector: 'button' });
    expect(allButton).toBeInTheDocument();
  })

  it('Should render "Active" button', () => {
    const activeButton = screen.getByText(/active/i);
    expect(activeButton).toBeInTheDocument();
  })

  it('Should render "Completed" button', () => {
    const completedButton = screen.getByText(/completed/i);
    expect(completedButton).toBeInTheDocument();
  })

  it('Should render "Clear all todos" button', () => {
    const clearButton = screen.getByText(/clear all todos/i);
    expect(clearButton).toBeInTheDocument();
  })
})
