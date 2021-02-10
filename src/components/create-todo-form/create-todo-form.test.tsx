import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'

import CreateTodoForm from '.'

afterEach(cleanup)

it('should clear the input when the todo is created successfully.', () => {
  const { getByPlaceholderText, getByTestId } = render(<CreateTodoForm />)
  const input = getByPlaceholderText('What needs to be done?') as HTMLInputElement

  input.value = 'todo'
  fireEvent.submit(getByTestId('create-form'))

  expect(input.value).toHaveLength(0)
})

it('should add an error CSS class when the input is dirty and the content is empty.', () => {
  const { getByPlaceholderText } = render(<CreateTodoForm />)
  const input = getByPlaceholderText('What needs to be done?')

  fireEvent.change(input, { target: { value: 'test' } })
  fireEvent.change(input, { target: { value: '' } })

  expect(getByPlaceholderText('What needs to be done?').className).toContain('error')
})

it('should add an error CSS class when the content is empty and the form is submitted.', () => {
  const { getByPlaceholderText, getByTestId } = render(<CreateTodoForm />)

  fireEvent.submit(getByTestId('create-form'))

  expect(getByPlaceholderText('What needs to be done?').className).toContain('error')
})
