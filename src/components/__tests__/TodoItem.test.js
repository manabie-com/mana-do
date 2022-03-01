import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TodoItem from '../TodoItem'
import { TodoStatus } from '../../models/todo'

configure({ adapter: new Adapter() })

const props = {
  todo: {
    content: 'Content',
    created_date: new Date().toISOString(),
    status: TodoStatus.ACTIVE,
    id: '123-abc',
    user_id: 'firstUser'
  },
  dispatch: jest.fn()
}

describe('<TodoItem />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<TodoItem {...props} />)
  })

  it('should have an input type checkbox', () => {
    expect(wrapper.find('input[type="checkbox"]').exists()).toBeTruthy()
  })
  it('should have a delete button', () => {
    expect(wrapper.find('button').exists()).toBeTruthy()
  })
  it('should have a p tag with content', () => {
    expect(wrapper.find('p').exists()).toBeTruthy()
    expect(wrapper.find('p').text()).toEqual('Content')
  })
  it('double click content to show editable input', () => {
    let pTag = wrapper.find('p')
    pTag.invoke('onDoubleClick')()
    expect(wrapper.find('input[type="text"]').exists()).toBeTruthy()
  })
})
