import { createSelector } from '@reduxjs/toolkit';

const authSelector = state => state.auth;

export const isLoggedSelector = createSelector(
  authSelector,
  ({ isLogged }) => isLogged
);
