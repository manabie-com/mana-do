import { createSelector } from 'reselect';
import {IRootState} from '../models/todo';

export const todoSelector = createSelector(
  (state: IRootState) => state.todo,
  (todo) => todo
)