import Enzyme from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import ModalEdit from './ModalEdit';
import { shallow } from 'enzyme';
import Modal from 'react-modal'
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

  it('should render an input tag', () => {
    const wrapper = shallow(<ModalEdit />);
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('should render react-modal', () => {
    const wrapper = shallow(<ModalEdit />);
    expect(wrapper.find(Modal)).toHaveLength(1);
  });

  it('should render a Cancel button', () => {
    const wrapper = shallow(<ModalEdit />);
    expect(wrapper.find('button[name="cancel"]').exists()).toBe(true);
  });

  it('should render a Edit button', () => {
    const wrapper = shallow(<ModalEdit />);
    expect(wrapper.find('button[name="edit"]').exists()).toBe(true);
  });