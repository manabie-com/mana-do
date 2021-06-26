import React from 'react'
import { render, screen } from '@testing-library/react'

import InputTodo from './index'

describe('InputTodo', () => {
  test('renders input todo', () => {
    render(<InputTodo />)
    const inputTodo = screen.getByRole('textbox')

    expect(inputTodo).toBeInTheDocument()
  })
})
