import React from 'react'
import { mount } from 'enzyme'
import ToDoPage from '.'

test('renders todo Page', () => {
  let wrapper = mount(<ToDoPage />)

  expect(wrapper.find('h1').first().text()).toEqual(
    'Manabie Todo List Challenge'
  )
  expect(wrapper.find('input.todo__input').first().props().placeholder).toEqual(
    'What need to be done?'
  )
})
