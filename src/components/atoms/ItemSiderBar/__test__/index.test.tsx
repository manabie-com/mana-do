import React from 'react';
import {render} from '@testing-library/react';
import {ItemSiderBar} from "../index";


describe('<ItemSiderBar /> render', () => {
    it('should match snapshot', function () {
        const props = {
            iconName: 'star',
            label:'Important',
            isMenuAcive: true
        }
        const Element = render(<ItemSiderBar {...props}/>);
        expect(Element.container.firstChild).toMatchSnapshot();
    });
})