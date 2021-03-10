import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { compose, createStore } from 'redux';
import todoApp from './store/reducer';
import { loadState, saveState } from './store/localStorage';
import throttle from "lodash/throttle";
const enhancers = compose(
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
const state = loadState();
const store = createStore(todoApp, state, enhancers)

store.subscribe(throttle(() => {
  saveState({
    Todo: store.getState().todos
  });
}, 1000));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
