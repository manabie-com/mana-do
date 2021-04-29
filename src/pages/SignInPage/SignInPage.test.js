import React from 'react';
import { mount } from 'enzyme';

import SignInPage from './SignInPage';

const fakeLocalStorage = (function () {
  let store = {};

  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    removeItem: function (key) {
      delete store[key];
    },
    clear: function () {
      store = {};
    }
  };
})();

describe('render SignInPage', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: fakeLocalStorage,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  let Component;
  const formMock = {
    userId: '',
    password: '',
  }

  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation((init) => [init, setState]);

  const clearToDoMock = jest.fn();

  const mockProps = {
    form: formMock,
    clearToDo: clearToDoMock,
  }
  
  beforeEach(() => {
    Component = mount(<SignInPage {...mockProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    expect(Component.length).toBe(1);
  });

  it('match snapshot', () => {
    expect(Component).toMatchSnapshot();
  });

  it('should render login form', () => {
    const LoginFormComp = Component.find('form.Form__signin');
    expect(LoginFormComp.length).toBe(1);
  });

  describe('should update userId and password', () => {
    it("should update userId", () => {
      const UserIdInputComp = Component.find('input#user_id');
      UserIdInputComp.simulate('change', { target: { name: 'userId', value: 'firstUser' } });

      expect(setState).toHaveBeenCalledWith({ ...mockProps.form, userId: 'firstUser' } );
    });

    it("should update password", () => {
      const UserIdInputComp = Component.find('input#password');
      UserIdInputComp.simulate('change', { target: { name: 'password', value: 'example' } });

      expect(setState).toHaveBeenCalledWith({ ...mockProps.form, password: 'example' } );
    });
  })

  it('should call setItem when click submit', () => {
    const SignInBtn = Component.find('form');
    SignInBtn.simulate('submit');

    window.localStorage.setItem('token', '123');
    expect(window.localStorage.getItem('token')).toEqual('123');
  })
});
