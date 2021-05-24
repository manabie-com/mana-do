import {Dispatch} from "react";
import service from '../../service';
import AuthActionsCreator, {ACTION_TYPES, IAuthenticateActions} from "./AuthActions";
import {handleAuthenticate} from './AuthSideEffects';

jest.mock('../../service');

describe('Test Auth Side Effects', () => {
  test('Should call dispatch with correct data when authenticate succeed', async () => {
    const signInSpy = jest.spyOn(service, 'signIn');
    signInSpy.mockResolvedValue('mock-token');
    const dispatch = jest.fn() as Dispatch<IAuthenticateActions>;
    await handleAuthenticate(dispatch, AuthActionsCreator.authenticate('mock-username', 'mock-password'));
    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith({
      type: ACTION_TYPES.AUTHENTICATE_SUCCESS,
      token: 'mock-token',
    })
  })
  test('Should call dispatch with correct data when authenticate failed', async () => {
    const signInSpy = jest.spyOn(service, 'signIn');
    signInSpy.mockRejectedValue('mock-error-message');
    const dispatch = jest.fn() as Dispatch<IAuthenticateActions>;
    await handleAuthenticate(dispatch, AuthActionsCreator.authenticate('mock-username', 'mock-password'));
    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith({
      type: ACTION_TYPES.AUTHENTICATE_FAIL,
      errorMessage: 'mock-error-message',
    })
  })
});