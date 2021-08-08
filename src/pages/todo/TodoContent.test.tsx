import React from 'react';
import ContentTodo from './TodoContent';
import { shallow } from 'enzyme';
import { TodoStatus } from '../../models/todo';

describe('<ContentTodo />', () => {
  test('Match snapshot', () => {
    const mockTodo = {
      id: '123',
      user_id: '123',
      content: 'abc',
      status: TodoStatus.ACTIVE,
      created_date: '123',
    };
    const fn = jest.fn();
    const wrapper = shallow(
      <ContentTodo todo={mockTodo} handleEditTodo={fn} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
