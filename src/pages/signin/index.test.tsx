import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { shallow } from 'enzyme';
import SignIn from './index';

describe('<Signin /> ', () => {
  test('Render title', () => {
    const { getByText } = render(<SignIn />);
    const title = getByText(/Welcome/i);

    expect(title).toBeInTheDocument();
  });

  test('Render input user id', () => {
    const { getByPlaceholderText } = render(<SignIn />);
    const inputUserId = getByPlaceholderText('Please input your user id');
    expect(inputUserId).toBeInTheDocument();
  });

  test('Render input password', () => {
    const { getByPlaceholderText } = render(<SignIn />);
    const inputPassword = getByPlaceholderText('Please input your password');
    expect(inputPassword).toBeInTheDocument();
  });

  test('Render button signin', () => {
    const { getByText } = render(<SignIn />);
    const buttonSignin = getByText('Sign in');
    expect(buttonSignin).toBeInTheDocument();
  });

  const setupInput = () => {
    const utils = render(<SignIn />);
    const input = utils.getByLabelText('user_id');
    return { input, ...utils };
  };

  test('It should change value onChange input', () => {
    const { input } = setupInput();
    expect(input.value).toBe('');
    fireEvent.change(input, { target: { value: 'firstuser' } });
    expect(input.value).toBe('firstuser');
  });

  test('Match snapshot', () => {
    const wrapper = shallow(<SignIn />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Should handle click submit button', () => {
    const fn = jest.fn();
    const utils = render(<SignIn />);
    const submit = utils.getByText('Sign in');
    fireEvent.click(submit);
  });
});
