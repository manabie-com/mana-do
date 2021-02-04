import * as React from 'react';
import { render } from '@testing-library/react';

import { Checkbox } from '../index';

describe('<Input />', () => {
  it('should match snapshot', () => {
    const checkbox = render(<Checkbox id="test" />);
    expect(checkbox.container.firstChild).toMatchSnapshot();
  });
});
