import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import SignInPage from '../SignInPage';
import AuthService from '../../../api-service/auth.service';

jest.mock('../../../api-service/auth.service');

const mockedAuthService = AuthService as jest.Mocked<typeof AuthService>;


describe('<SigninPage />', () => {
  beforeEach(() => {  
    render(<SignInPage />);
  });
  
  // it('Should call API when valid form', () => {
  //   const signInMockFn = jest.fn().mockResolvedValueOnce({ token: 'TOKEN' });
  //   mockedAuthService.signIn = signInMockFn; // mockResolvedValueOnce({ token: 'TOKEN' });
  //   const formValues = {
  //     username: 'username',
  //     password: 'pass'
  //   };
  //   fireEvent.input(screen.getByTestId("username"), {
  //     target: {
  //       value: formValues.username
  //     }
  //   });
  //   fireEvent.input(screen.getByTestId("password"), {
  //     target: {
  //       value: formValues.password
  //     }
  //   });
    
  //   fireEvent.submit(screen.getByRole("button"));
    
  //   expect(mockedAuthService.signIn).toBeCalledTimes(1);
  // });

});
