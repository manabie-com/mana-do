import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { LoginPage } from '../index'

import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Service from '../../../service'
import { failedResponse, successResponse } from '../../../utils/constant'

import "@testing-library/jest-dom"

/**
 * Test cases
 * 1. should be rendered without crashing
 * 2. should be rendered with elements
 * 3. should be displayed an error if login with an invalid account
 * 4. should be logged in successfully with a valid account
 */

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

describe('<LoginPage />', () => {

  test('should be rendered without crashing', () => {
    const wrapper = render(<LoginPage />)
    expect(wrapper.container).toMatchSnapshot()
  })

  test('should be rendered with elements', () => {
    const wrapper = render(<LoginPage />)
    expect(document.getElementById('username')).toBeInTheDocument()
    expect(document.getElementById('password')).toBeInTheDocument()
    expect(wrapper.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  test('should be displayed an error if login with an invalid account', async () => {
    const wrapper = render(<LoginPage />)
    jest.spyOn(Service, 'login').mockRejectedValueOnce(failedResponse)
    userEvent.type(document.getElementById('username') as HTMLElement, 'test')
    userEvent.type(document.getElementById('password') as HTMLElement, 'password test')
    userEvent.click(wrapper.getByRole('button'))
    await waitFor(() => {
      expect(wrapper.getByRole('alert')).toBeInTheDocument()
    })
  })

  test('should be logged in successfully with a valid account', async () => {
    const wrapper = render((
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    ))
    
    jest.spyOn(Service, 'login').mockResolvedValueOnce(successResponse)
    userEvent.type(document.getElementById('username') as HTMLElement, 'test')
    userEvent.type(document.getElementById('password') as HTMLElement, 'password test')
    userEvent.click(wrapper.getByRole('button'))
    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith('/')
    })
  })

})