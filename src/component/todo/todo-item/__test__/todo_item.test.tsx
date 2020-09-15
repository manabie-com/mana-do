import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TodoItem, { Props } from '../TodoItem';


describe('<TodoItem />', () => {
  const onUpdateMock = jest.fn();
  const onDeleteMock = jest.fn();
  const onUpdateStatusMock = jest.fn();
  const content = 'CONTENT';
  const defaultProps: Props = {
    id: '12',
    isDone: true,
    content: content,
    onUpdate: onUpdateMock,
    onDelete: onDeleteMock,
    onUpdateStatus: onUpdateStatusMock
  };

  it('Should render corectly', () => {
    const wrapper = shallow(<TodoItem {...defaultProps} />);
    expect(toJson(wrapper))
  });

  it('Should render todo content', () => {
    const wrapper = shallow(<TodoItem {...defaultProps} />);
    expect(wrapper.find('span').text()).toMatch(/content/i);
  });

  it('Should todo edit mode when dbClick', () => {
    const wrapper = shallow(<TodoItem {...defaultProps} />);
    wrapper.find('span').simulate('doubleClick');
    wrapper.update();
    expect(wrapper.find('TodoEdit').exists()).toBeTruthy();
    expect(wrapper.find('.ToDo__item').exists()).toBeFalsy();
  });

  it('Should call onDelete when delete action', () => {
    const wrapper = shallow(<TodoItem {...defaultProps} />);
    wrapper.find('.Todo__delete').simulate('click');
    expect(onDeleteMock).toBeCalled();
  });

  it('Should call onUpdateStatus when checkbox action', () => {
    const wrapper = shallow(<TodoItem {...defaultProps} />);
    wrapper.find('input[type="checkbox"]').simulate('change');
    expect(onUpdateStatusMock).toBeCalled();
  });  

});

