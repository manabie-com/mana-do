import React from 'react';
import App from "../App";
import {render} from "@testing-library/react";

describe('<App /> render', () => {
    it('should match snapshot', function () {
        const elm = render(<App/>);
        expect(elm.container.firstChild).toMatchSnapshot();
    });
})