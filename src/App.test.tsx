import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Input from 'src/components/Input'
import SignInPage from './SignInPage'

describe('App', () => {
  test('renders sign in form', () => {
    render(<SignInPage />)
    const userIdInput = screen.getByLabelText('User id')
    const passwordIdInput = screen.getByLabelText('Password')

    expect(userIdInput).toBeInTheDocument()
    expect(passwordIdInput).toBeInTheDocument()
  })

  test('calls the onChange callback handler', async () => {
    const onChange = jest.fn()
    render(<Input id='user_id' value='' name='userId' onChange={onChange} />)

    await userEvent.type(screen.getByRole('textbox'), 'firstUser')

    expect(onChange).toHaveBeenCalledTimes(9)
  })
})
