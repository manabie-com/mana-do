import React from 'react';
import {cleanup, render, screen} from '@testing-library/react';
import ToDoPage from '../ToDoPage';
import { createMemoryHistory, createLocation } from 'history';
import { match } from 'react-router';

const history = createMemoryHistory();
const path = `/route/:id`;
const matchtest: match<{ id: string }> = {
  isExact: false,
  path,
  url: path.replace(':id', '1'),
  params: { id: "1" }
};
const location = createLocation(matchtest.url);

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('Todo render correct content', () => {
  const todoPage = render(<ToDoPage history={history} location={location} match={matchtest} key={1}/>);
  expect(todoPage).toMatchSnapshot();
});
