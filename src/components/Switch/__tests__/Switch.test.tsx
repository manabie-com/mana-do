import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { Switch, Props } from '../Switch';

describe('Switch', () => {
  const defaultProps: Props = { onChange: jest.fn(), value: false };

  it('should render the component', () => {
    const wrapper = shallow(<Switch />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call onChange with the correct state when the switch is clicked', () => {
    const wrapper = shallow(<Switch {...defaultProps} />);

    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(defaultProps.onChange).toBeCalledWith(true);

    wrapper.find('input').simulate('change', { target: { checked: false } });
    expect(defaultProps.onChange).toBeCalledWith(false);
  });

  it('should update state correctly with the correct state when the switch is clicked', () => {
    const wrapper = shallow(<Switch {...defaultProps} />);

    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(wrapper.find('input').prop('checked')).toBe(true);

    wrapper.find('input').simulate('change', { target: { checked: false } });
    expect(wrapper.find('input').prop('checked')).toBe(false);
  });

  it('should initially unchecked when value is false', () => {
    const wrapper = shallow(<Switch {...defaultProps} value={false} />);

    expect(wrapper.find('input').prop('checked')).toBe(false);
  });

  it('should toggle checked state properly', () => {
    const wrapper = shallow(<Switch {...defaultProps} value={false} />);

    expect(wrapper.find('input').prop('checked')).toBe(false);

    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(wrapper.find('input').prop('checked')).toBe(true);
  });
});
