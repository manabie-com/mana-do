import React from 'react'
import ReactDOM from 'react-dom'
import SignInForm from '../SignInForm'
import { render, cleanup } from '@testing-library/react'

afterEach(cleanup)

test('Sign in form renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(<SignInForm />, div)
})

test('Sign in page matches snapshot', () => {
  const { asFragment } = render(<SignInForm/>)

  const componentRender = asFragment()
  expect(componentRender).toMatchSnapshot()
})

test('Sign in form renders the form', () => {
  const { getByTestId } = render(<SignInForm/>)
  const form = getByTestId('sign-in-form')

  expect(form).toBeInTheDocument()
})

test('Sign in form has username field', () => {
  const { getByTestId } = render(<SignInForm/>)
  const username = getByTestId('sign-in-input-userid')

  expect(username).toBeInTheDocument()
  expect(username).toBeRequired()
})

test('Sign in form has password field', () => {
  const { getByTestId } = render(<SignInForm/>)
  const password = getByTestId('sign-in-input-password')

  expect(password).toBeInTheDocument()
  expect(password).toBeRequired()
})

test('Sign in form has sign in button', () => {
  const { getByTestId } = render(<SignInForm/>)
  const button = getByTestId('sign-in-button')

  expect(button).toBeInTheDocument()
})


