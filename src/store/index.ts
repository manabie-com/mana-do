import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import todosSlice from '../screen/todo/duck/reducers';

const store = configureStore({
  reducer: {
    todos: todosSlice,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppselector: TypedUseSelectorHook<AppState> = useSelector;

export default store;
