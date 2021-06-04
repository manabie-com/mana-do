import React from 'react';
import {render} from "@testing-library/react";
import App from "./App";

// TODO: find way to test how many routes are there
test('must render App component', () => {
  const {container} = render(<App/>);
  expect(container.querySelectorAll('.App').length).toEqual(1);
});
