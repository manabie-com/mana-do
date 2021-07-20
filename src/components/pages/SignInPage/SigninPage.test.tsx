import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import SignInPage from './SignInPage';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';

jest.mock('../../../service', () => ({signIn:jest.fn().mockResolvedValue({})}))
jest.mock('../../../service', () => ({signIn:jest.fn().mockImplementation(() => Promise.resolve('testabc.xyz.ahk'))}))

describe('Sign In Page', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should render signin page', () => {
        render(<SignInPage />)
        expect(screen.getByTestId('signIn__form-userId')).toBeInTheDocument()
        expect(screen.getByText('Password')).toBeInTheDocument()
    })

    it('should login success', async () => {
        const history = createMemoryHistory({})
        jest.spyOn(history, 'push')
        render(<Router history={history}>
            <SignInPage />
        </Router>)
        userEvent.type(screen.getByTestId('signIn__form-userId'), 'firstUser')
        userEvent.type(screen.getByTestId('signIn__form-password'), 'example')

        userEvent.click(screen.getByTestId('btn-submit'))

        expect(history.push).toHaveBeenCalled()
    })

    it('should alert message when login failed',async ()=>{
        render(<SignInPage/>)
        userEvent.type(screen.getByTestId('signIn__form-userId'), 'firstUser')
        userEvent.type(screen.getByTestId('signIn__form-password'), 'sai')

        userEvent.click(screen.getByTestId('btn-submit'))
        
        await waitFor(expect(screen.getByText('Tên đăng nhập hoặc mật khẩu sai!')).toBeInTheDocument())
    })
})