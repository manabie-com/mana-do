import React from 'react';
import {render} from '@testing-library/react';
import {MenuActive, Toolbar} from "../index";

describe('<Toolbar /> render', () => {
    it('should match snapshot', function () {
        const Element = render(<Toolbar callback={jest.fn()} menuActive={MenuActive.IMPORTANT}/>);
        expect(Element.container.firstChild).toMatchSnapshot();
    });
})