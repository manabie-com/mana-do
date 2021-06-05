import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import axios from '../../../utils/axios';
import SignInPage from './SignInPage';
import {act} from "react-dom/test-utils";
import {BrowserRouter} from "react-router-dom";

describe('Todo page must work properly', function () {
  const OLD_ENV = process.env;
  const token = localStorage.token;
  const testingToken = 'testingToken';

  beforeEach(() => {
    localStorage.setItem('token', '');
    jest.mock('axios');
    process.env = {
      ...OLD_ENV,
      'REACT_APP_WHOAMI': 'fullstack'
    };
  });

  afterAll(() => {
    jest.resetAllMocks();
    jest.resetModules(); // it clears the cache
    process.env = OLD_ENV; // Restore old environment
    localStorage.setItem('token', token);
  });

  it('must not call authorize if localStorage does not contain token', () => {
    localStorage.setItem('token', '');
    jest.spyOn(axios, 'get');

    render(<SignInPage/>);

    expect(axios.get).not.toBeCalled();
    localStorage.setItem('token', token);
  });

  it('must call authorize if localStorage contains token', () => {
    localStorage.setItem('token', testingToken);

    jest.spyOn(axios, 'get');

    render(<SignInPage/>);

    // Call API with saved token in request header authorization
    expect(axios.get).toBeCalledWith(
      '/authorize',
      {
        'headers': { 'Authorization': testingToken }
      }
    );
  });

  // TODO: test history push to path /todo
  // it('must call history to push to todoPage if authorized', () => {
  //   const mockHistoryPush = jest.fn();
  //   const mockLocation = {
  //     pathname: '/',
  //     hash: '',
  //     search: '',
  //     state: ''
  //   };
  //   jest.mock('react-router-dom', () => ({
  //     ...jest.requireActual('react-router-dom'),
  //     useHistory: () => ({
  //       push: mockHistoryPush
  //     })
  //   }));
  //   localStorage.setItem('token', testingToken);
  //
  //   jest.spyOn(axios, 'get').mockResolvedValueOnce({});
  //
  //   render(
  //     <SignInPage/>
  //   );
  //
  //   expect(mockLocation.pathname).toEqual('/todo');
  // });

  // it('must return error message when server reject the username/password',  async () => {
  //   const errorMsg = 'This is error msg';
  //   act(() => {
  //     render(
  //       <BrowserRouter>
  //         <SignInPage/>
  //       </BrowserRouter>
  //     );
  //   })
  //
  //   jest.spyOn(axios, 'get').mockRejectedValueOnce(errorMsg);
  //   await act(async () => {
  //     // await fireEvent.click(document.querySelector('.MButton') as HTMLButtonElement);
  //     expect(axios.get).toBeCalledWith('/login?user_id=&password=');
  //     act(() => {
  //       expect((document.querySelector('.ErrorMessage') as HTMLElement).textContent).toEqual(errorMsg);
  //     });
  //   });
  //   // fireEvent.click(document.querySelector('.MButton') as HTMLButtonElement);
  //   // expect(axios.get).toBeCalledWith('/login?user_id=&password=');
  //   // expect((document.querySelector('.ErrorMessage') as HTMLElement).textContent).toEqual(errorMsg);
  // });

});
