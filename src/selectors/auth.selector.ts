import { createSelector } from 'reselect';
import IRootState from '../models/app';

export const accessTokenSelector = createSelector(
  (state: IRootState) => state.auth,
  (auth) => auth.ACCESS_TOKEN
)