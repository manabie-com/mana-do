import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Navigation } from '../index'

import { render, fireEvent, waitFor } from "@testing-library/react"
import Service from '../../../service'
import { successResponse } from '../../../utils/constant'

import "@testing-library/jest-dom";

/**
 * Test cases
 * 1. should be rendered without crashing
 * 2. should be rendered with elements
 * 3. should be logout and redirect to /login
 */

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

describe('<Navigation />', () => {

  test('should be rendered without crashing', () => {
    const wrapper = render(<Navigation />)
    expect(wrapper.container).toMatchSnapshot()
  })

  test('should be rendered with elements', () => {
    const wrapper = render(<Navigation />)
    expect(wrapper.getByText('Logout')).toBeInTheDocument()
  })

  test('should be logout and redirect to /login', async () => {
    jest.spyOn(Service, 'logout').mockResolvedValueOnce(successResponse)
    const wrapper = render((
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    ))
    await waitFor(() => {
      fireEvent.click(wrapper.getByText('Logout'))
    })
    expect(mockHistoryPush).toHaveBeenCalledWith('/login');
  })

})
