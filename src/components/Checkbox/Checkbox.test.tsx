import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Checkbox from './index'

describe('Checkbox', () => {
  test('renders checkbox', () => {
    render(<Checkbox />)
    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).toBeInTheDocument()
  })

  test('calls the onClick handler', async () => {
    const onChange = jest.fn()
    render(<Checkbox checked onChange={onChange} />)

    await userEvent.click(screen.getByRole('checkbox'))

    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
