import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { TodoStatus } from '../../models/todo'
import ToDoList from '../TodoList'

describe('<ToDoList />', () => {
  test('ToDoList renders without crashing', () => {
    render(<ToDoList />)
  })

  test('There are no todos shown', () => {
    const { getByTestId } = render(<ToDoList listTodos={mockListData} />)
    const listItems = getByTestId('list-todos')
    expect(listItems.childNodes.length).toEqual(mockListData.length)
  })

  test('should show No data when filter COMPLETED and data empty', () => {
    const { getByText } = render(
      <ToDoList listTodos={[]} filter={TodoStatus.COMPLETED} />
    )
    const listItems = getByText('No data for filter ' + TodoStatus.COMPLETED)
    expect(listItems.innerHTML).toEqual(
      'No data for filter ' + TodoStatus.COMPLETED
    )
  })

  test('should show No data when filter ACTIVE and data empty', () => {
    const { getByText } = render(
      <ToDoList listTodos={[]} filter={TodoStatus.ACTIVE} />
    )
    const listItems = getByText('No data for filter ' + TodoStatus.ACTIVE)
    expect(listItems.innerHTML).toEqual(
      'No data for filter ' + TodoStatus.ACTIVE
    )
  })
})

const mockListData = [
  {
    content: 'aefef',
    created_date: '2022-05-06T08:02:59.185Z',
    status: 'ACTIVE',
    id: 'vOcDqS1ri',
    user_id: 'firstUser',
  },
  {
    content: 'tst 2',
    created_date: '2022-05-06T06:46:41.962Z',
    status: 'ACTIVE',
    id: 'GPIkUEOO0',
    user_id: 'firstUser',
  },
]
