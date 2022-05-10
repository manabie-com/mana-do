import React from 'react';
import {render} from '@testing-library/react';
import {Icon} from "../index";

describe('<Icon /> render', () => {
    it('should match snapshot', function () {
        const Element = render(<Icon name="star"/>);
        expect(Element.container.firstChild).toMatchSnapshot();
    });
})