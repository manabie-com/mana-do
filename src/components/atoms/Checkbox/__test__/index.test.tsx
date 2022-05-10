import React from 'react';
import {render, screen} from '@testing-library/react';
import {Checkbox} from "../index";

describe('<Checkbox /> render', () => {
    it('should match snapshot', function () {
        const loadingIndicator = render(<Checkbox className="test" color="primary"/>);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
})