import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TodoList from '../TodoList'
import TodoItem from '../TodoItem'

configure({ adapter: new Adapter() })

describe('<TodoList />', () => {
  const props = {
    todos: [],
    dispatch: jest.fn()
  }

  it('renders TodoList without crashing', () => {
    const wrapper = shallow(<TodoList {...props} />)
    expect(wrapper.find(TodoItem).length).toBe(props.todos.length)
  })
})
