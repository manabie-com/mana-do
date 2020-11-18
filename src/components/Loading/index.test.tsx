import React from 'react';
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Loading from '.'

describe('Components - Loading', () => {
  it('should render loading component', () => {
    const { getByText } = render(<Loading />)
    const message = getByText(/Loading/i)

    expect(message).toBeInTheDocument()
  })
})
