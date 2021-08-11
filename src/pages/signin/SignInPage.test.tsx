import React from 'react'
import { render, fireEvent, screen } from '../../test-utils'
import { act } from 'react-dom/test-utils';
import SignInPage from './SignInPage'

test('Test login successfully', async () => {
    await act(async() => {
        render(<SignInPage />);
    });

    const username = screen.getByPlaceholderText('Enter User ID') as HTMLInputElement
    fireEvent.change(username, {
        target: {value: 'firstUser'},
    })

    const password = screen.getByPlaceholderText('Enter Password') as HTMLInputElement
    fireEvent.change(password, {
        target: {value: 'example'},
    })
    fireEvent.click(screen.getByTestId('login'));
    expect(screen.getByTestId('alert')).toBeNull
 
})