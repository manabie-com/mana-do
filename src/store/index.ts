import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from './rootReducers';

const store = createStore(
    rootReducers,
    composeWithDevTools(),
);

export default store;
