import Enzyme from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import AddNewTaskForm from './AddNewTaskForm';
import { shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

it('should render properly', () => {
    const tree = renderer.create(<AddNewTaskForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render an input tag', () => {
    const wrapper = shallow(<AddNewTaskForm />);
    expect(wrapper.find('input').exists()).toBe(true);
  });
