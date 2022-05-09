import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import ToDoPage from '../ToDoPage'

describe('<ToDoPage />', () => {
  test('ToDoPage renders without crashing', () => {
    render(<ToDoPage />)
  })

  test('ToDoPage contains input field and it has focus on mount', () => {
    render(<ToDoPage />)
    const inputField = screen.getByPlaceholderText('What need to be done?')
    expect(inputField).toHaveFocus()
  })

  test('There are no todos shown', () => {
    const { container } = render(<ToDoPage />)
    expect(container).toHaveTextContent(/No data/i)
  })

  test('Render button Active, Completed, All', () => {
    const { container } = render(<ToDoPage />)
    const listBtn = container.querySelectorAll('.Action__btn')
    expect(listBtn.length).toEqual(4)
  })
})
