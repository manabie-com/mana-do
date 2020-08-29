import React, { useReducer } from 'react';
import { render, fireEvent } from '@testing-library/react';
import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  // Tip: all queries are also exposed on an object
  // called "queries" which you could import here as well
  waitFor,
} from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import App from './App';
import ToDoPage from './ToDoPage';
import TodoItem from './components/TodoItem';
import { Todo, TodoStatus } from './models/todo';
import reducer, { initialState } from './store/reducer';

test('renders site', () => {
  const { getByTestId } = render(<App />);
  const linkElement1 = getByTestId("password");
  const linkElement2 = getByTestId("user_id");
  expect(linkElement1).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
});

test('test todo item', () => {
  const { getByTestId } = render(<TodoItem todo={{ status: TodoStatus.COMPLETED, content: "23" }} />);
  const linkElement1 = getByTestId("content");
  // const linkElement2 = getByTestId("checkbox");
  expect(linkElement1.textContent).toBe("23")

  // fireEvent.click(linkElement2)
  // expect(linkElement2.checked).toEqual(true)

  expect(linkElement1).toBeInTheDocument();
});


test('renders todo done', () => {
  const { getByTestId } = render(<ToDoPage />);
  const linkElement1 = getByTestId("todo_container");
  expect(linkElement1).toBeInTheDocument();
});


test('add todo ',async () => {
  const { getByTestId } = render(<ToDoPage />);
  const linkElement1 = getByTestId("valid-form");
  const linkElement2 = getByTestId("todo_list")
  expect(getByTestId('valid-form')).not.toBeInvalid()

  fireEvent.change(linkElement1, { target: { value: '23' } })
  expect(linkElement1.value).toBe('23')

  fireEvent.keyDown(linkElement1, { key: 'Enter', code: 'Enter' })
  expect(linkElement1).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
});
