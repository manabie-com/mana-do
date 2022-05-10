import React from 'react';
import {render} from '@testing-library/react';
import {Span} from "../index";

describe('<Span /> render', () => {
    it('should match snapshot', function () {
        const Element = render(<Span/>);
        expect(Element.container.firstChild).toMatchSnapshot();
    });
})