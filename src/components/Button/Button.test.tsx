import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Button from './index'

describe('Button', () => {
  test('renders button', () => {
    render(<Button>Foo</Button>)
    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
  })

  test('calls the onClick handler', async () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Foo</Button>)

    await userEvent.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
