import React from 'react';
import { render } from '@testing-library/react'

import SignIn from '.'

describe('Pages - SignIn', () => {
  it('should render sign in page component', () => {
    const { getByText } = render(<SignIn />)
    const signInButton = getByText(/SIGN IN/i)

    expect(signInButton).toBeInTheDocument()
  })
})
