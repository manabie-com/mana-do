import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {BrowserRouter} from "react-router-dom"

it('renders learn react link', () => {
  const { getByTestId } = render(<BrowserRouter><App /></BrowserRouter>);
  const rootApp = getByTestId('root-app');
  expect(rootApp).toHaveClass('App');
});
