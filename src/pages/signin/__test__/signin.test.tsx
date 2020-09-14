import React from 'react';
import { shallow, ShallowWrapper, mount, } from 'enzyme';
import toJson from 'enzyme-to-json';
import SignInPage from '../SignInPage';

let wrapper: ShallowWrapper;

beforeEach(() => {  
  wrapper = shallow(<SignInPage />);
});


describe('<SigninPage />', () => {
  // it('Should render correctly', () => {
  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });

  it('Should have a <form />', () => {
    const formTotal = wrapper.find('form').length;
    expect(formTotal).toEqual(1);
  })

  // it('Should show username err when form is Invalid', () => {
  //   const input = wrapper.find('[data-test-id="usernameInput"]').first();
  //   input.simulate('keydown', { key: 'Enter' });
  //   const errMsg = wrapper.find('[data-test-id="usernameErr"]').exists();
  //   expect(errMsg).toEqual(true);
  // });

  // it('Should show password err when form is Invalid', () => {
  //   const input = wrapper.find('[data-test-id="passwordInput"]');
  //   input.simulate('keydown', { key: 'Enter' });
  //   const errMsg = wrapper.find('[data-test-id="passwordErr"]').exists();
  //   expect(errMsg).toEqual(true);
  // });

  it('Should has a button to submit', () => {
    const submitButton = wrapper.exists('[data-test-id="submitButton"]')
    expect(submitButton).toEqual(true);
  });

  it('Should not call API when invalida form', () => {
    const mockFn = jest.fn();
    jest.mock('../SignInPage', () => ({
      signIn: mockFn,
    }));
    const formValues = {
      username: 'username',
      password: 'pass'
    };
    const inputUser = wrapper.find('[data-test-id="usernameInput"]');
    inputUser.simulate('change', { target: { value: formValues.username }});
    const inputPass = wrapper.find('[data-test-id="passwordInput"]');
    inputUser.simulate('change', { target: { value: formValues.password }});
    wrapper.find('[data-test-id="submitButton"]').simulate('submit');
    expect(mockFn).toBeCalled();
  });

});
