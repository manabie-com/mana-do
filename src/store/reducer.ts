import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import autoMergeLever2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import toDoReducer from '../modules/reducer';

const toDoPersistConfig = {
  key: 'toDo',
  storage,
  stateReconciler: autoMergeLever2
}

const rootReducer = combineReducers({
  toDo: persistReducer<any, any>(toDoPersistConfig, toDoReducer)
});

export default rootReducer;