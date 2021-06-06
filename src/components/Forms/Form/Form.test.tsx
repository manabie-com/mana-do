import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Form from './Form';

describe('<Form />', () => {
  it('Can be submitted', () => {
    const mockSubmit = jest.fn();
    const { getByTestId } = render(<Form onSubmit={mockSubmit} />);
    let form = getByTestId('form');
    fireEvent.submit(form);

    expect(mockSubmit).toHaveBeenCalled();
  });
});
