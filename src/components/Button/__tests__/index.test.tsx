import * as React from 'react';
import { render } from '@testing-library/react';

import { Button } from '../index';

describe('<Button />', () => {
  it('should match snapshot', () => {
    const button = render(<Button />);
    expect(button.container.firstChild).toMatchSnapshot();
  });

  it('should match primary snapshot', () => {
    const button = render(<Button primary />);
    expect(button.container.firstChild).toMatchSnapshot();
  });
});
