import { createStore } from 'redux';
import globalReducer from './reducer';

export default createStore(globalReducer);
