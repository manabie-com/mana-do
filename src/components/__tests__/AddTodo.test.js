import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AddTodo from '../AddTodo'

configure({ adapter: new Adapter() })

describe('<AddTodo />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<AddTodo />)
  })

  it('renders AddTodo without crashing', () => {
    shallow(<AddTodo />)
  })

  it('should have an input', () => {
    expect(wrapper.find('input').exists()).toBeTruthy()
  })

  it('input can type value', () => {
    let input = wrapper.find('input')
    input.simulate('change', {
      target: {
        value: 'Lorem Ipsum'
      }
    })
    input = wrapper.find('input')
    expect(input.prop('value')).toEqual('Lorem Ipsum')
  })
})
