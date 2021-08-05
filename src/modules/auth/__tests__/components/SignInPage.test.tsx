
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignInPage from '../../SignInPage';
import * as AuthContextFile from '../../AuthContext';

Enzyme.configure({ adapter: new Adapter() })

describe("SignIn Page", () => {
  it('should render submit button', () => {
    const state = {
      isLoading: false,
      isAuthenticated: false,
      error: ""
    }
    jest.spyOn(AuthContextFile, 'useAuthContext').mockImplementation(() => {
      return {state, dispatch: () => {} };
    });
    const wrapper = shallow(
      <SignInPage />
    );
    const buttonElement = wrapper.find('.form__btn');
    expect(buttonElement).toHaveLength(1);
    expect(buttonElement.text()).toEqual('Sign in');
  })
  it('should render error message at a first coming', () => {
    const state = {
      isLoading: false,
      isAuthenticated: false,
      error: "Token is invalid"
    }
    jest.spyOn(AuthContextFile, 'useAuthContext').mockImplementation(() => {
      return {state, dispatch: () => {} };
    });
    const wrapper = shallow(
      <SignInPage />
    );
    const buttonElement = wrapper.find('#error');
    expect(buttonElement).toHaveLength(1);
    expect(buttonElement.text()).toEqual('Token is invalid');
  })
});