import { combineReducers } from 'redux';

import todoReducer from './todoReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers({ 
    auth: authReducer,
    todo: todoReducer
});

export default rootReducer;