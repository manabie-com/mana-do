import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ToDoPage from '../ToDoPage'
import AddTodo from '../AddTodo'
import TodoList from '../TodoList'
import Toolbar from '../Toolbar'

configure({ adapter: new Adapter() })

describe('<ToDoPage />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<ToDoPage />)
  })

  it('renders TodoPage without crashing', () => {
    shallow(<ToDoPage />)
  })

  it('should have AddTodo', () => {
    expect(wrapper.find(AddTodo)).toHaveLength(1)
  })

  it('should have Toolbar', () => {
    expect(wrapper.find(Toolbar)).toHaveLength(1)
  })

  it('should have TodoList', () => {
    expect(wrapper.find(TodoList)).toHaveLength(1)
  })
})
