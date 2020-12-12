import ModalEdit from '../ModalEdit';
import React from 'react';
import { shallow } from 'enzyme';
import Modal from 'react-modal';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

it('renders react-modal', () => {
    const wrapper = shallow(<ModalEdit />);
    expect(wrapper.find(Modal)).toHaveLength(1);
  });