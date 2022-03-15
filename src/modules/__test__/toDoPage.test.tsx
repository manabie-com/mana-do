import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToDoPage from '../ToDoPage';
import '@testing-library/jest-dom/extend-expect';
import { store } from '../../store';

interface ChildrenInterface {
  children: any;
}

const ReduxWrapper = ({ children }: ChildrenInterface) => (
  <Provider store={store}>{children}</Provider>
);

beforeEach(() => {
  const component = render(<ToDoPage />, { wrapper: ReduxWrapper });
});

test('Todos list app should have a title', () => {
  const titleAppElm = screen.queryByText(/Todos list application/);
  expect(titleAppElm).toBeInTheDocument();
});

test('Should be able to type an todo', () => {
  const toDoInputElm = screen.getByRole('textbox');
  userEvent.type(toDoInputElm, 'Do the test interview');
  expect(toDoInputElm.value).toBe('Do the test interview');
});
