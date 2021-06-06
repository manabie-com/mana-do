import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TextInput from './TextInput';

const props = {
  text: 'Text input',
  placeholder: 'Input placeholder',
};

describe('<TextInput />', () => {
  it('is rendered', () => {
    let { container } = render(<TextInput {...props} />);
    expect(container).toBeVisible();
  });

  it('render with provided text', () => {
    let { getByText } = render(<TextInput {...props} />);
    getByText(props.text);
  });

  it('render without provided title', () => {
    let { queryByText } = render(<TextInput />);
    expect(queryByText(props.text)).toBeNull();
  });

  it('render with input onchange', () => {
    let { getByPlaceholderText } = render(<TextInput {...props} />);
    let input = getByPlaceholderText(props.placeholder);
    input.focus();
    fireEvent.change(input, { target: { value: props.text } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(input).toHaveValue(props.text);
  });
});
