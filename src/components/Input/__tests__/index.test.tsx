import * as React from 'react';
import { render } from '@testing-library/react';

import { Input } from '../index';

describe('<Input />', () => {
  it('should match snapshot', () => {
    const input = render(<Input />);
    expect(input.container.firstChild).toMatchSnapshot();
  });
});
