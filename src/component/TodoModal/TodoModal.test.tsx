import React from "react";
import TodoModal from "./TodoModal";
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

test('renders a modal', () => {
    render(<TodoModal show={true} setShow onDeleteAlltodo/>);
    const titleElement = screen.getByText(/Delete all todos/i);
    expect(titleElement).toBeInTheDocument();
})