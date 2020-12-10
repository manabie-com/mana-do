import Enzyme from 'enzyme';
import React from 'react';
import { render } from '@testing-library/react';
import ShowTodosList from './ShowTodosList';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import Actions from './Actions';
import ModalEdit from './ModalEdit';

Enzyme.configure({ adapter: new Adapter() });

it('should render properly', () => {
    const tree = renderer.create(<ShowTodosList />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render Actions component', () => {
    const wrapper = shallow(<ShowTodosList />);
    expect(wrapper.find(Actions)).toHaveLength(1);
  });

it('opens modal when a task is double clicked', () => {
  const wrapper = shallow(<ModalEdit />);
  expect(wrapper.find(ModalEdit).prop('modalIsOpen')).toBe(false);

//   wrapper.find('button').simulate('click');
//   expect(wrapper.find(ModalEdit).prop('isOpen')).toBe(true);
});





