import React from 'react';
import ReactDOM from 'react-dom';
import SignInPage from './SignInPage';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SignInPage />, div);
});