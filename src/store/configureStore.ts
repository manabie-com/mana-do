import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { save, load } from 'redux-localstorage-simple';

import { rootReducer } from './reducers';

export function configureAppStore() {
  const middlewares = [save()];

  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), ...middlewares],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: load(),
  });

  return store;
}
