import React from 'react';
import TodoPage from './index';
import { shallow } from 'enzyme';

describe('<TodoPage />', () => {
  test('Match snapshot', () => {
    const wrapper = shallow(<TodoPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
