import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {},
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
