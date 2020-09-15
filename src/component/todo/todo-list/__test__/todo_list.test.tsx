import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TodoList, { Props } from '../TodoList';
import { ITodo, ETodoStatus } from '../../../../types/todo';

describe('<TodoList />', () => {
  const onDeteleMock = jest.fn();
  const onUpdateMock = jest.fn();
  const onUpdateStatusMock = jest.fn();
  const listMock: ITodo[] = [
    {
      id: '1',
      content: 'one',
      status: ETodoStatus.ACTIVE,
      created_date: new Date().toISOString(),
      user_id: 'user'
    },
  ];
  const defaultProps: Props = {
    list: listMock,
    onDelete: onDeteleMock,
    onUpdate: onUpdateMock,
    onUpdateTodoStatus: onUpdateStatusMock
  }
  it('Should render corectly', () => {
    const wrapper = shallow(<TodoList {...defaultProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should render empty', () => {
    const wrapper = shallow(<TodoList {...defaultProps} list={[]} />);
    expect(wrapper.find('.empty').exists()).toBeTruthy();
  });

  it('Should render n TodoItem', () => {
    const wrapper = shallow(<TodoList {...defaultProps} />);
    expect(wrapper.find('TodoItem')).toHaveLength(1);
  });

});