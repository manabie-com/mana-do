import { configureStore } from '@reduxjs/toolkit';

import todoReducer from './slices/todoSlice';
import authReducer from './slices/authSlice';

export default configureStore({
  reducer: {
    todo: todoReducer.reducer,
    auth: authReducer.reducer
  },
});
