import React from 'react';
import { render } from '@testing-library/react';

import TodoCell from './TodoCell';

test('render TodoCell correctly', () => {
  const { container } = render(
    <TodoCell className="new-cell" width="100px" maxWidth="100px" center={true}>
      Mock cell content
    </TodoCell>
  );
  expect(container.textContent).toEqual('Mock cell content');
});
