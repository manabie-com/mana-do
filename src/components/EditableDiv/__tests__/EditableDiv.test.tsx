import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import { EditableDiv, Props } from '../EditableDiv';

describe('Switch', () => {
  const defaultProps: Props = { content: 'content example', onComplete: jest.fn() };

  const enterEditMode = (wrapper: ShallowWrapper) => {
    const content = wrapper.find('.content--test');
    content.simulate('doubleClick');
  };

  const requestComplete = (wrapper: ShallowWrapper, newContent: string) => {
    enterEditMode(wrapper);

    wrapper.find('input').simulate('change', { target: { value: newContent } });
    wrapper.find('input').simulate('keyDown', { key: 'Enter' });
  };

  const testContentAfterCancel = (wrapper: ShallowWrapper) => {
    expect(wrapper.find('.content--test').exists()).toBe(true);

    enterEditMode(wrapper);

    expect(wrapper.find('input').prop('value')).toBe(defaultProps.content);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component', () => {
    const wrapper = shallow(<EditableDiv {...defaultProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should initially not in edit mode', () => {
    const wrapper = shallow(<EditableDiv {...defaultProps} />);

    const content = wrapper.find('.content--test');

    expect(content.exists()).toBe(true);
  });

  it('should enter edit mode when content is double clicked', () => {
    const wrapper = shallow(<EditableDiv {...defaultProps} />);

    enterEditMode(wrapper);

    const input = wrapper.find('input');

    expect(input.exists()).toBe(true);
  });

  it('should call onComplete with new content', () => {
    const wrapper = shallow(<EditableDiv {...defaultProps} />);

    const newContent = 'new content';

    requestComplete(wrapper, newContent);

    expect(defaultProps.onComplete).toBeCalledWith(newContent);
  });

  it('should not call onComplete and stay editing when the new content is empty', () => {
    const wrapper = shallow(<EditableDiv {...defaultProps} />);

    const newContent = '';

    requestComplete(wrapper, newContent);

    expect(defaultProps.onComplete).not.toBeCalled();
  });

  it('should not call onComplete and stay editing when the new content is the same', () => {
    const wrapper = shallow(<EditableDiv {...defaultProps} />);

    const newContent = defaultProps.content;

    requestComplete(wrapper, newContent);

    expect(defaultProps.onComplete).not.toBeCalled();
  });

  it('should cancel edit and discard changes when Escape is pressed', () => {
    const wrapper = shallow(<EditableDiv {...defaultProps} />);

    enterEditMode(wrapper);

    wrapper.find('input').simulate('change', { target: { value: 'new content' } });
    wrapper.find('input').simulate('keyDown', { key: 'Escape' });

    testContentAfterCancel(wrapper);
  });

  it('should cancel edit and discard changes when the input is blurred', () => {
    const wrapper = shallow(<EditableDiv {...defaultProps} />);

    enterEditMode(wrapper);

    wrapper.find('input').simulate('blur');

    testContentAfterCancel(wrapper);
  });
});
