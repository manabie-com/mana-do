import React from 'react';
import { render } from '@testing-library/react'

import Notification from '.'

describe('Components - Notification', () => {
  it('should render a notification', () => {
    const message = 'A mock message'
    const { getByText } = render(
      <Notification type="info">
        {message}
      </Notification>
    )
    const notification = getByText(message)

    expect(notification.getAttribute('class')).toMatch(/info/)
  })

  it('should render an error notification', () => {
    const message = 'A mock error message'
    const { getByText } = render(
      <Notification type="error">
        {message}
      </Notification>
    )
    const notification = getByText(message)

    expect(notification.getAttribute('class')).toMatch(/error/)
  })

  it('should render an alert notification', () => {
    const message = 'A mock alert message'
    const { getByText } = render(
      <Notification type="alert">
        {message}
      </Notification>
    )
    const notification = getByText(message)

    expect(notification.getAttribute('class')).toMatch(/alert/)
  })
})
