import React from 'react';
import {render} from '@testing-library/react';
import {Loading} from "../index";

describe('<Loading /> render', () => {
    it('should match snapshot', function () {
        const Element = render(<Loading isLoading/>);
        expect(Element.container.firstChild).toMatchSnapshot();
    });
})