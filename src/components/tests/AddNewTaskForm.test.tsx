import AddNewTaskForm from '../AddNewTaskForm';
import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

it('should render an input tag', () => {
    const wrapper = shallow(<AddNewTaskForm />);
    expect(wrapper.find('input').exists()).toBe(true);
  });
