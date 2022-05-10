import React from 'react';
import ToDoInput from '../ToDoInput';
import { render } from '@testing-library/react';

describe('ToDoInput', () => {
  it('Should match snapshot', () => {
    const { container } = render(<ToDoInput />);
    expect(container).toMatchSnapshot();
  });
});

describe('Render ToDoInput', () => {
  it('Should render ToDoInput with placeholder text', async () => {
    const { getByPlaceholderText } = render(<ToDoInput />);
    expect(getByPlaceholderText(/what need to be done/i)).toBeInTheDocument();
  });
});
