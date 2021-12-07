import React from 'react';
import { render } from '@testing-library/react';
import SignInPage from './SignInPage';
import Service from './service'

describe('Login component tests', () => {
  test('Login Form render', () => {
    const { asFragment } = render(<SignInPage />)

    expect(asFragment(<SignInPage />)).toMatchSnapshot()
  })

  test('Login form should be in the document', () => {
    const { getByTestId } = render(<SignInPage />)
    const inputNode = getByTestId('login-form')

    expect(inputNode).toBeInTheDocument()
  })

  test('UserId field should be in the document', () => {
    const { getByTestId } = render(<SignInPage />)
    const userIdField = getByTestId('input-userId')

    expect(userIdField).toBeInTheDocument()
    expect(userIdField).toBeRequired()
  })

  test('Password field should be in the document', () => {
    const { getByTestId } = render(<SignInPage />)
    const passwordField = getByTestId('input-password')

    expect(passwordField).toBeInTheDocument()
    expect(passwordField).toBeRequired()
  })


  test('Submit button should be in the document', () => {
    const { getByTestId } = render(<SignInPage />)
    const btnSubmit = getByTestId('btn-submit')

    expect(btnSubmit).toBeInTheDocument()
    expect(btnSubmit).toHaveAttribute('type', 'submit')
  })
})
