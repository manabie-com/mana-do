import { createStore, applyMiddleware } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import appReducer from './app.reducer';

const middleEnhancers = applyMiddleware(thunkMiddleWare);
const composeEnhancers = composeWithDevTools({});

const store = createStore(appReducer, composeEnhancers(middleEnhancers));

export default store;