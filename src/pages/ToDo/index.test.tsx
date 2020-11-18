import React from 'react';
import { render } from '@testing-library/react'

import ToDo from '.'

describe('Pages - SignIn', () => {
  it('should render todo page component', () => {
    const { getByPlaceholderText, getByText } = render(<ToDo />)
    const todoInput = getByPlaceholderText(/What need to be done?/i)
    const noTotosText = getByText(/No Todos/i)

    expect(todoInput).toBeInTheDocument()
    expect(noTotosText).toBeInTheDocument()
  })
})
