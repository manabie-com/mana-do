import { combineReducers } from 'redux';
import loading from '../loading/loading.reducer';
import auth from '../auth/auth.reducer';

const appReducer = combineReducers({
  loading,
  auth,
});

export type AppState = ReturnType<typeof appReducer>;

export default appReducer;