import { createSelector } from '@reduxjs/toolkit';

const appSelector = (state: Object) => state.app;

export const isLoadingSelector = createSelector(
  appSelector,
  state => state.isLoading
);
