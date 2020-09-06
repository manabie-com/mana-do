import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('render login page', () => {
  const {getByTestId} = render(<App/>);

  const password = getByTestId("password");
  const userId = getByTestId("user_id");

  expect(password).toBeInTheDocument();
  expect(userId).toBeInTheDocument();
})