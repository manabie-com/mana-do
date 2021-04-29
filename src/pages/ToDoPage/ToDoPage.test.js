import React from 'react';
import { mount } from 'enzyme';

import ToDoPage from './ToDoPage';

describe('render ToDoPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockProps = {
    todos: [{}, {}, {}],
  }

  const Component = mount(<ToDoPage {...mockProps} />);

  it('should render', () => {
    expect(Component.length).toBe(1);
  });
  it('match snapshot', () => {
    expect(Component).toMatchSnapshot();
  });

  it('should have todos data', () => {
    expect(mockProps.todos.length).toEqual(3);
  });
});
