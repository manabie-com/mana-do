import { combineReducers } from '@reduxjs/toolkit';

import auth from 'store/modules/auth/slice';
import app from 'store/modules/app/slice';

const rootReducer = combineReducers({
  auth,
  app
});

export default rootReducer;
