import React from 'react'
import { render, cleanup, screen, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import App from './App'

afterEach(cleanup)

it('redirect to / path if token does not exist', () => {
    const history = createMemoryHistory()
    render(
        <Router history={history}>
            <App />
        </Router>,
    )
    expect(screen.getAllByText(/Log in/i)).toBeTruthy()
})
