import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'

import InputTodo from './index'

afterEach(cleanup)

describe('InputTodo', () => {
  test('renders input todo', () => {
    render(<InputTodo />)
    const inputTodo = screen.getByRole('textbox')

    expect(inputTodo).toBeInTheDocument()
  })
})
