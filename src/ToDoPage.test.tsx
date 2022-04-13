import React from "react";
import ToDoPage from "./ToDoPage";
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';

test('Enter onkeydown', () => {
    const onKeyDown = jest.fn();
    render(<ToDoPage/>)
    const todoInput = screen.getByRole('addTodo')
    const addButton = screen.getByRole('addToTodos')
    fireEvent.click(addButton);
    // expect(todoInput.ref).toBeInTheDocument();
})