import React from 'react';
import { render, cleanup } from '@testing-library/react';
import SignInPage from '../pages/SignInPage';
import userEvent from '@testing-library/user-event';

afterEach(cleanup);

describe('Test login feature', () => {
    it('Input should be empty when begin', () => {
        const component = render(<SignInPage />);
        const userInput = component.getByLabelText('User id') as HTMLInputElement;
        const passInput = component.getByLabelText('Password') as HTMLInputElement;

        expect(userInput.value).toBe('');
        expect(passInput.value).toBe('');
    });

    it('Input value should be same with user input', () => {
        const [user, pass] = ['firstUser', 'example'];
        const component = render(<SignInPage />);
        const userInput = component.getByLabelText('User id') as HTMLInputElement;
        const passInput = component.getByLabelText('Password') as HTMLInputElement;

        userEvent.type(userInput, user);
        expect(userInput.value).toBe(user);
        userEvent.type(passInput, pass);
        expect(passInput.value).toBe(pass);
    });

    it('Input value should be same with user input', () => {
        const [user, pass] = ['firstUser', 'example'];
        const component = render(<SignInPage />);
        const userInput = component.getByLabelText('User id') as HTMLInputElement;
        const passInput = component.getByLabelText('Password') as HTMLInputElement;

        userEvent.type(userInput, user);
        expect(userInput.value).toBe(user);
        userEvent.type(passInput, pass);
        expect(passInput.value).toBe(pass);
    });
});
