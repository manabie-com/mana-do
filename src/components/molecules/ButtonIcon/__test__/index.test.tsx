import React from 'react';
import {render} from '@testing-library/react';
import {ButtonIcon} from "../index";

describe('<ButtonIcon /> render', () => {
    it('should match snapshot', function () {
        const Element = render(<ButtonIcon iconName="star" onClick={jest.fn()}/>);
        expect(Element.container.firstChild).toMatchSnapshot();
    });
})