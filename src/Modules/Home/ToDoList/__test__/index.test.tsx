import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import TodoList from "../index";

describe('<TodoList/> render', () => {
        it('should match snapshot', function () {
                const loadingIndicator = render(<TodoList/>);
                expect(loadingIndicator.container.firstChild).toMatchSnapshot();
        });

        it('shows success message after confirm button is clicked', () => {
        })
})