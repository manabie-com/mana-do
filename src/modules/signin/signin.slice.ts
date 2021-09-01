import { createSlice } from '@reduxjs/toolkit';
import Service from '../../service';

export const signInSlice = createSlice({
  name: 'signIn',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    signInRequest: (state, action) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    signInFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetSignInError: (state, action) => {
      state.error = null;
    }
  }
});

export const { signInRequest, signInSuccess, signInFailed, resetSignInError } = signInSlice.actions

export const signIn = (username: string, password: string) => async (dispatch: any) => {
  dispatch(signInRequest(null));
  try {
    const response = await Service.signIn(username, password);
    dispatch(signInSuccess(response));
  } catch (err) {
    dispatch(signInFailed(err));
  }
};

export const resetError = () => async (dispatch: any) => {
  dispatch(resetSignInError(null));
};

export default signInSlice.reducer

