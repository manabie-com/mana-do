import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import TodoItem from '../TodoItem'

describe('<TodoItem />', () => {
  const onUpdateData = jest.fn()
  const onRemoveItem = jest.fn()
  const onError = jest.fn()

  void test('TodoItem renders without crashing', () => {
    render(
      <TodoItem
        data={mockDataCompleted}
        onUpdateData={onUpdateData}
        onRemoveItem={onRemoveItem}
        onError={onError}
      />
    )
  })

  test('should COMPLETED in checkbox', () => {
    const { container } = render(
      <TodoItem
        data={mockDataCompleted}
        onUpdateData={onUpdateData}
        onRemoveItem={onRemoveItem}
        onError={onError}
      />
    )
    const inputCheck = container.querySelector(
      `input[type='checkbox']`
    ) as HTMLInputElement
    expect(inputCheck.checked).toBe(true)
  })

  test('should ACTIVE in checkbox', () => {
    const { container } = render(
      <TodoItem
        data={mockDataActive}
        onUpdateData={onUpdateData}
        onRemoveItem={onRemoveItem}
        onError={onError}
      />
    )
    const inputCheck = container.querySelector(
      `input[type='checkbox']`
    ) as HTMLInputElement
    expect(inputCheck.checked).toBe(false)
  })

  test('should call onChange when click checkbox', () => {
    const { container } = render(
      <TodoItem
        data={mockDataActive}
        onUpdateData={onUpdateData}
        onRemoveItem={onRemoveItem}
        onError={onError}
      />
    )
    const inputCheck = container.querySelector(
      `input[type='checkbox']`
    ) as HTMLInputElement
    fireEvent.click(inputCheck, { target: { checked: true } })
    expect(onUpdateData).toBeCalledTimes(1)
  })

  test('should call onRemoveItem when click button delete', () => {
    const { container } = render(
      <TodoItem
        data={mockDataActive}
        onUpdateData={onUpdateData}
        onRemoveItem={onRemoveItem}
        onError={onError}
      />
    )
    const inputCheck = container.querySelector(
      `.Todo__delete`
    ) as HTMLInputElement
    fireEvent.click(inputCheck)
    expect(onRemoveItem).toBeCalledTimes(1)
  })
})

const mockDataCompleted = {
  content: 'afsss',
  created_date: '2022-05-06T12:44:34.962Z',
  status: 'COMPLETED',
  id: 'o7Z_oBuwU',
  user_id: 'firstUser',
}

const mockDataActive = {
  content: 'afsss',
  created_date: '2022-05-06T12:44:34.962Z',
  status: 'ACTIVE',
  id: 'o7Z_oBuwU',
  user_id: 'firstUser',
}
