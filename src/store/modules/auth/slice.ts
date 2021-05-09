import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogged: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getProfile: () => {},
    setLogin: state => {
      state.isLogged = true;
    },
    clearLogin: state => {
      state.isLogged = false;
    }
  }
});

export const { getProfile, setLogin, clearLogin } = authSlice.actions;

export default authSlice.reducer;
