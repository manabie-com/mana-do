import React from 'react';
import {render, screen} from '@testing-library/react';
import {Button} from "../index";

describe('<Button/> render', () => {
        it('should match snapshot', function () {
                const loadingIndicator = render(<Button className="test" color="primary"/>);
                expect(loadingIndicator.container.firstChild).toMatchSnapshot();
        });
        it('should be render with className primary', function () {
                render(<Button/>)
                const buttonElm = screen.queryByTestId('btn primary')
                expect(buttonElm).toBeInTheDocument()
        });
})