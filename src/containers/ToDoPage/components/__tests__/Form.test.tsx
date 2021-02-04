import * as React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';

import { configureAppStore } from 'store/configureStore';
import { Form, Props } from '../Form';

const store = configureAppStore();
const renderForm = (props: Props) =>
  render(
    <Provider store={store}>
      <Form {...props} />
    </Provider>,
  );

describe('<Form />', () => {
  it('should render <form> tag', () => {
    const { container } = renderForm({});
    expect(container.querySelector('form')).toBeInTheDocument();
  });

  it('should handle reset input', () => {
    const { container } = renderForm({});
    const input = container.querySelector('input');
    const form = container.querySelector('form');
    fireEvent.change(input!, { target: { value: 'test' } });
    fireEvent.submit(form!);
    expect(input!.value).toBe('');
  });

  it('should handle onSubmit as prop', () => {
    const onSubmit = jest.fn();
    const { container } = renderForm({ onSubmit });
    const input = container.querySelector('input');
    const form = container.querySelector('form');
    fireEvent.change(input!, { target: { value: 'test' } });
    fireEvent.submit(form!);
    expect(onSubmit).toBeCalled();
  });

  it('should not do anything', () => {
    const onSubmit = jest.fn();
    const { container } = renderForm({ onSubmit });
    const form = container.querySelector('form');
    fireEvent.submit(form!);
    expect(onSubmit).not.toBeCalled();
  });
});
