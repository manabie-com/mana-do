import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Toolbar from '../Toolbar'
import { TodoStatus } from '../../models/todo'

configure({ adapter: new Adapter() })

const props = {
  filteredTodos: [],
  todos: [],
  dispatch: jest.fn(),
  setShowing: jest.fn()
}

describe('<Toolbar />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Toolbar {...props} />)
  })

  it('should have a select', () => {
    expect(wrapper.find('select').exists()).toBeTruthy()
  })
  it('should have a clear all button', () => {
    expect(wrapper.find('button').exists()).toBeTruthy()
    expect(wrapper.find('button').text()).toEqual('Clear all')
  })

  it('should not have a checkbox when have no todos', () => {
    expect(wrapper.find('input[type="checkbox"]').exists()).toBeFalsy()
  })

  it('should have a checkbox when have todos', () => {
    const newProps = {
      ...props,
      todos: [
        {
          content: 'Content',
          created_date: new Date().toISOString(),
          status: TodoStatus.ACTIVE,
          id: '123-abc',
          user_id: 'firstUser'
        }
      ],
      filteredTodos: [
        {
          content: 'Content',
          created_date: new Date().toISOString(),
          status: TodoStatus.ACTIVE,
          id: '123-abc',
          user_id: 'firstUser'
        }
      ]
    }
    wrapper = shallow(<Toolbar {...newProps} />)
    expect(wrapper.find('input[type="checkbox"]').exists()).toBeTruthy()
  })
})
