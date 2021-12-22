import React from 'react';
import ToDoPage from '../src/ToDoPage'
import {shallow, mount} from 'enzyme'
import toJson from 'enzyme-to-json'

test('Testing to do app', () => {
    let wrapper = shallow(<ToDoPage />)
    let input = wrapper.find('.Todo__input');
    input.simulate('focus');
    input.simulate('change', {target: {value: 'abcdef'}});
    // input.getDOMNode().value = 'abcdef';
    input.simulate('keydown', {key: 'Enter'})

    // expect(toJson(wrapper.find('.ToDo__list'))).toMatchSnapshot();
    expect(wrapper.find('.ToDo__item')).toHaveLength(1);
})