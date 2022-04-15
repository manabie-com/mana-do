import React from 'react'
import { mount, shallow } from 'enzyme'
import { fakeTodo } from '../../test/liveState'
import TodoItem from '../TodoItem'
import * as actions from '../../store/actions'
import { TodoStatus } from '../../models/todo'

const getProps = (overlay: any = {}) => ({
  todo: fakeTodo,
  dispatch: jest.fn(),
  ...overlay,
})

afterEach(() => jest.restoreAllMocks())

test('should render TodoItem correctly', () => {
  const props = getProps()
  const component = shallow(<TodoItem {...props} />)

  expect(component.find('.ToDo__content').text()).toEqual('Test content')
  expect(component.find('.ToDo__item-toggle').exists()).toBe(true)
  expect(component.find('.Todo__delete').exists()).toBe(true)
})

test('should render edit input when double click to the content', () => {
  const props = getProps()
  const component = shallow(<TodoItem {...props} />)

  component.find('.ToDo__content').simulate('doubleClick')
  expect(component.find('.ToDo__content').exists()).toBe(false)
  expect(component.find('.inline-input').exists()).toBe(true)
})

test('should cancel edit when user click to cancel button', () => {
  const props = getProps()
  const component = mount(<TodoItem {...props} />)

  component.find('.ToDo__content').simulate('doubleClick')
  expect(component.find('.ToDo__content').exists()).toBe(false)
  expect(component.find('.inline-input').exists()).toBe(true)

  component.find('.Todo__delete').simulate('click')

  expect(component.find('.ToDo__content').exists()).toBe(true)
  expect(component.find('.inline-input').exists()).toBe(false)
})

test('should dispatch deleteTodoAction when user click delete button', () => {
  const delteTodoMockAction = jest.spyOn(actions, 'deleteTodo').mockReturnValue('deleteTodo')
  const props = getProps()
  const component = shallow(<TodoItem {...props} />)

  component.find('.Todo__delete').simulate('click')
  expect(props.dispatch).toBeCalledWith('deleteTodo')
  expect(delteTodoMockAction).toBeCalledWith(fakeTodo.id)
})

test('should dispatch updateTodoAction with correct status when user click to toggle input', () => {
  const updateTodoMockAction = jest.spyOn(actions, 'updateTodo').mockReturnValue('updateTodo')
  const props = getProps()
  const component = shallow(<TodoItem {...props} />)

  component.find('.ToDo__item-toggle').simulate('change', { target: { checked: true } })
  expect(props.dispatch).toHaveBeenCalledWith('updateTodo')
  expect(updateTodoMockAction).toHaveBeenCalledWith(fakeTodo.id, { status: TodoStatus.COMPLETED })

  component.find('.ToDo__item-toggle').simulate('change', { target: { checked: false } })
  expect(updateTodoMockAction).toHaveBeenCalledWith(fakeTodo.id, { status: TodoStatus.ACTIVE })
})

test('should render Todo toggle is checked when todo status is COMPLETED', () => {
  const props = getProps({
    todo: {
      ...fakeTodo,
      status: TodoStatus.COMPLETED,
    },
  })
  const component = shallow(<TodoItem {...props} />)

  expect(component.find('.ToDo__item-toggle').prop('checked')).toBe(true)
})
