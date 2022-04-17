import React, { useReducer } from 'react'
import { mount } from 'enzyme'
import { renderHook } from '@testing-library/react-hooks'
import reducer from '@/store/reducer'
import {
  stateProvider,
  statusesFilterProvider,
  emptyLabelByStatusProvider
} from '@/__mocks__/todo'
import TodoList from '.'

describe.each(statusesFilterProvider)(
  'Test the number of todo item rendered',
  ({ description, status, numOfRecord }) => {
    const { result } = renderHook(() => useReducer(reducer, stateProvider))
    const [{ todos }, dispatch] = result.current

    it(description, () => {
      let component = mount(
        <TodoList todos={todos} currentStatus={status} dispatch={dispatch} />
      )
      expect(component.find('.todo-item').length).toEqual(numOfRecord)
    })
  }
)

describe.each(emptyLabelByStatusProvider)(
  'Test render empty label depend to status',
  ({ description, status, label }) => {
    const { result } = renderHook(() => useReducer(reducer, stateProvider))
    const [, dispatch] = result.current

    it(description, () => {
      let component = mount(
        <TodoList todos={[]} currentStatus={status} dispatch={dispatch} />
      )
      expect(component.find('.todo-list__empty').first().text()).toEqual(label)
    })
  }
)
