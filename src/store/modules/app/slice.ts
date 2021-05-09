import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false
};

const appSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoading: state => {
      state.isLoading = true;
    },
    stopLoading: state => {
      state.isLoading = false;
    }
  }
});

export const { startLoading, stopLoading } = appSlice.actions;

export default appSlice.reducer;
