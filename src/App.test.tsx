import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import App from './App';
import Service from './service'

describe("Todo page tests", () => {
  beforeAll(() => {
    localStorage.setItem('token', 'testabc.xyz.ahk');
  });

  test('should show title of todo', () => {
    const { getByRole } = render(<App />);
    const titleElement = getByRole('heading', { level: 1 });
    expect(titleElement).toHaveTextContent(/todo/i);
  });
});

describe("SignIn render Page", () => {
  beforeEach(() => {
    localStorage.removeItem('token');
  });

  test('should show title of sign in', () => {
    const { getByRole } = render(<App />);
    const titleElement = getByRole('heading', { level: 1 });
    expect(titleElement).toHaveTextContent(/sign in/i);
  });

  test('render the sign in page title', () => {
    const { getByRole } = render(<App />);
    const titleElement = getByRole('heading', { level: 1 });
    expect(titleElement).toHaveTextContent(/sign in/i);
  });

  test('render and check the user id input', () => {
    const { getByTestId } = render(<App />);
    const inputUserId = getByTestId('user_id');
    fireEvent.change(inputUserId, {
      target: {
        value: 'crissang'
      }
    });

    expect(inputUserId).toHaveValue('crissang');
  });

  test('render and check the user id input', () => {
    const { getByTestId } = render(<App />);
    const inputPassword = getByTestId('password');
    fireEvent.change(inputPassword, {
      target: {
        value: '123456'
      }
    });

    expect(inputPassword).toHaveValue('123456');
  });

  describe("SignIn behavior", () => {
    const setup = () => {
      const screen = render(<App />)
      const inputUserId = screen.getByTestId('user_id');
      const inputPassword = screen.getByTestId('password');
      const buttonSubmit = screen.getByTestId('btn-submit');

      return {
        inputUserId,
        inputPassword,
        buttonSubmit,
        ...screen,
      }
    }

    test('user sign in successfully and token added to local storage', async () => {
      // mock Service signIn for the test
      const UserResponse = { token: 'testabc.xyz.ahk' };

      const spy = jest.spyOn(Service, 'signIn').mockImplementationOnce(() => {
        return Promise.resolve(UserResponse.token);
      });

      const {
        inputUserId,
        inputPassword,
        getByTestId,
        getByRole,
      } = setup();

      await act (async () => {
        fireEvent.change(inputUserId, {
          target: {
            value: 'firstUser'
          }
        });

        fireEvent.change(inputPassword, {
          target: {
            value: 'example'
          }
        });
      });

      await act (async () => {
        fireEvent.submit(getByTestId('sign-in-form'));
      });

      const title = await getByRole('heading', { level: 1 });

      expect(title).toHaveTextContent(/todo/i);
      expect(window.localStorage.getItem('token')).toEqual(UserResponse.token);

      spy.mockRestore();
    });
  });
});
