import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import TodoEdit, { AppProps } from '../TodoEdit';

describe("<TodoEdit />", () => {
  it("Should render corectly", () => {
    const defaultValue = 'YYYY';
    const onCancelMock = jest.fn();
    const onUpdateMock: jest.Mock<void, [string]> = jest.fn();
    const props: AppProps = {
      defaultValue: defaultValue,
      onCancel: onCancelMock,
      onUpdate: onUpdateMock,
    };
    const wrapper = shallow(<TodoEdit {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("Should render corectly default value", () => {
    const defaultValue = 'YYYY';
    const onCancelMock = jest.fn();
    const onUpdateMock: jest.Mock<void, [string]> = jest.fn();
    const props: AppProps = {
      defaultValue: defaultValue,
      onCancel: onCancelMock,
      onUpdate: onUpdateMock,
    };
    const wrapper = mount(<TodoEdit {...props} />)
    const inputValue = wrapper.find('input');
    expect(inputValue.props().defaultValue).toEqual(defaultValue);
    expect(inputValue.exists()).toBeTruthy();
  });

  it("Should onCancel when onBlur", () => {
    const defaultValue = 'YYYY';
    const onCancelMock = jest.fn();
    const onUpdateMock: jest.Mock<void, [string]> = jest.fn();
    const props: AppProps = {
      defaultValue: defaultValue,
      onCancel: onCancelMock,
      onUpdate: onUpdateMock,
    };
    const wrapper = mount(<TodoEdit {...props} />)
    const inputValue = wrapper.find('input');
    inputValue.simulate('blur');
    expect(onCancelMock).toBeCalled();
  });

  it("Should prvent onUpdate when is not modify", () => {
    const defaultValue = 'YYYY';
    const onCancelMock = jest.fn();
    const onUpdateMock: jest.Mock<void, [string]> = jest.fn();
    const props: AppProps = {
      defaultValue: defaultValue,
      onCancel: onCancelMock,
      onUpdate: onUpdateMock,
    };
    const wrapper = shallow(<TodoEdit {...props} />)
    const inputValue = wrapper.find('input');
    inputValue.simulate('change', { target: { value: defaultValue }});
    inputValue.simulate('keydown', { key: 'Enter' });
    wrapper.update();
    expect(onUpdateMock).not.toBeCalled();
  });

   it("Should onUpdate and onCancel when modify", () => {
    const defaultValue = 'YYYY';
    const onCancelMock = jest.fn();
    const onUpdateMock: jest.Mock<void, [string]> = jest.fn();
    const props: AppProps = {
      defaultValue: defaultValue,
      onCancel: onCancelMock,
      onUpdate: onUpdateMock,
    };
    const wrapper = shallow(<TodoEdit {...props} />)
    wrapper.find('input').simulate('change', { target: { value: defaultValue + 'Edit' }});
    wrapper.find('input').simulate('keyDown', { key: 'Enter' });
    wrapper.update();
    expect(onUpdateMock).toBeCalled();
    expect(onCancelMock).toBeCalled();
  });


  it("Should not run onUpdate when modify is empty", () => {
    const defaultValue = 'YYYY';
    const onCancelMock = jest.fn();
    const onUpdateMock: jest.Mock<void, [string]> = jest.fn();
    const props: AppProps = {
      defaultValue: defaultValue,
      onCancel: onCancelMock,
      onUpdate: onUpdateMock,
    };
    const wrapper = shallow(<TodoEdit {...props} />)
    wrapper.find('input').simulate('change', { target: { value: '' }});
    wrapper.find('input').simulate('keyDown', { key: 'Enter' });
    wrapper.update();
    expect(onUpdateMock).not.toBeCalled();
    expect(onCancelMock).toBeCalled();
  });

  it("Should not run onUpdate when Escape, run onCancel", () => {
    const defaultValue = 'YYYY';
    const onCancelMock = jest.fn();
    const onUpdateMock: jest.Mock<void, [string]> = jest.fn();
    const props: AppProps = {
      defaultValue: defaultValue,
      onCancel: onCancelMock,
      onUpdate: onUpdateMock,
    };
    const wrapper = shallow(<TodoEdit {...props} />)
    wrapper.find('input').simulate('keyDown', { key: 'Escape' });
    wrapper.update();
    expect(onUpdateMock).not.toBeCalled();
    expect(onCancelMock).toBeCalled();
  });

});