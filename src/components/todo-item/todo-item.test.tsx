import React, { useReducer } from 'react'
import { mount } from 'enzyme'
import { renderHook } from '@testing-library/react-hooks'
import reducer from '@/store/reducer'
import { stateProvider } from '@/__mocks__/todo'
import TodoItem from '.'

it('calls onUpdateTodoStatus and onDeleteTodo callback', () => {
  const onUpdateTodoStatus = jest.fn()
  const onDeleteTodo = jest.fn()

  const event = {
    target: { checked: true }
  } as React.ChangeEvent<HTMLInputElement>

  const { result } = renderHook(() => useReducer(reducer, stateProvider))
  const [{ todos }, dispatch] = result.current

  let component = mount(
    <TodoItem
      dispatch={dispatch}
      onDeleteTodo={onDeleteTodo}
      todo={todos[0]}
      onUpdateTodoStatus={onUpdateTodoStatus}
    />
  )
  component.find('input.todo-item__checkbox').first().simulate('change', event)
  component
    .find('button.todo-item__delete-btn')
    .first()
    .simulate('click', event)
  expect(onUpdateTodoStatus).toBeCalledTimes(1)
  expect(onDeleteTodo).toBeCalledTimes(1)
})

it('This should be render correct todo content', () => {
  const onUpdateTodoStatus = jest.fn()
  const onDeleteTodo = jest.fn()

  const { result } = renderHook(() => useReducer(reducer, stateProvider))
  const [{ todos }, dispatch] = result.current

  let component = mount(
    <TodoItem
      dispatch={dispatch}
      onDeleteTodo={onDeleteTodo}
      todo={todos[0]}
      onUpdateTodoStatus={onUpdateTodoStatus}
    />
  )

  expect(component.find('.todo-item__content--display').first().text()).toEqual(
    todos[0].content
  )
})
