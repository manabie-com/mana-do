import React from 'react';

import AddNewTaskForm from '../AddNewTaskForm';
import ActionButtons from '../ActionButtons';
import Header from '../Header';

import { render } from '@testing-library/react'

it('should render Header component', () => {
    const { getByText } = render(<Header />)
    const notice = getByText(/Hey/i)

    expect(notice).toBeInTheDocument()
})

it('should render AddNewTaskForm component', () => {
    const { getByText } = render(<AddNewTaskForm />)
    const notice = getByText(/What need to be done?/i)

    expect(notice).toBeInTheDocument()
})

it('should render ActionButtons component', () => {
    const { getByText } = render(<ActionButtons />)
    const notice = getByText(/active/i)

    expect(notice).toBeInTheDocument()
})
