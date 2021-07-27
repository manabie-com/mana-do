
import React from "react";
import { BrowserRouter as Router } from "react-router-dom"
import ToDoContainer from "../containers/Todo";
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

const defaultProps: any = {
  foo: true,
  bar: false,
  history: {
    replace: jest.fn(),
  },
}

test("Btn SignOut", () => {
    render(<Router><ToDoContainer {...defaultProps} /></Router>);
  const buttonEl = screen.getByText(/Sign Out/i);
    userEvent.click(buttonEl);
});

test('Button Active', () => {
  render(<Router><ToDoContainer {...defaultProps} /></Router>);
  const buttonEl = screen.getByText(/Active/i, { selector: 'button' });
  userEvent.click(buttonEl);
});
// test('Button All Todo', () => {
//   render(<Router><ToDoContainer {...defaultProps} /></Router>);
//   const buttonEl = screen.getByText('All ToDo');
//   userEvent.click(buttonEl);
// });
// test('Button Completed', () => {
//   render(<Router><ToDoContainer {...defaultProps} /></Router>);
//   const buttonEl = screen.getByText(/Completed/i, { selector: 'button' });
//   userEvent.click(buttonEl);
// });