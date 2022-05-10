import React from 'react';
import {render} from '@testing-library/react';
import {Input} from "../index";

describe('<Input /> render', () => {
    it('should match snapshot', function () {
        const Element = render(<Input/>);
        expect(Element.container.firstChild).toMatchSnapshot();
    });
})