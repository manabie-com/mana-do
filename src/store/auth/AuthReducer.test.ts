import {authReducer} from './AuthReducer';
import AuthActionsCreator from "./AuthActions";

describe('Test Auth Reducer', () => {
  test('Should return correct state when authenticating', () => {
    const state = authReducer(undefined, AuthActionsCreator.authenticate('test', 'test'));
    expect(state.loading).toEqual(true);
    expect(state.errorMessage).toBeNull();
  })
  test('Should return correct state when authenticate succeed', () => {
    const state = authReducer(undefined, AuthActionsCreator.authenticateSucceed('mock-token'));
    expect(state.loading).toEqual(false);
    expect(state.token).toEqual('mock-token');
    expect(state.errorMessage).toBeNull();
  })
  test('Should return correct state when authenticate failed', () => {
    const state = authReducer(undefined, AuthActionsCreator.authenticateFailed('mock-error-message'));
    expect(state.loading).toEqual(false);
    expect(state.errorMessage).toEqual('mock-error-message');
  })
  test('Should return correct state when logging out', () => {
    const state = authReducer(undefined, AuthActionsCreator.logout());
    expect(state.loading).toEqual(true);
  })
  test('Should return correct state when logged out', () => {
    const state = authReducer(undefined, AuthActionsCreator.logoutSucceed());
    expect(state.loading).toEqual(false);
    expect(state.token).toBeNull()
  })
})