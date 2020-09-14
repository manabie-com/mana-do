import reducer, { initState } from '../auth.reducer';
import { SignIn } from '../types';

describe('Test auth reducers', () => {
  it('Shoule return init state', () => {
    const action = {
      type: '',
      payload: {}
    }
    const updatedState = reducer(undefined, action);
    expect(updatedState).toEqual(initState);
  });
  //
  it('Shoule signin sucess', () => {
    const action = {
      type: SignIn,
      payload: {}
    };
    const expectState = {
      ...initState,
      isLogin: true,
    }
    const updatedState = reducer(initState, action);
    expect(updatedState).toEqual(expectState);
  });
});
