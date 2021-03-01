import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import todoApp from "./store/reducer";
import throttle from "lodash/throttle";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { loadState, saveState } from "./localStorage";
import { Provider } from "react-redux";
import TodoList from "./containers/todoList";
const persistedState = loadState();
//create store from Redux
const store = createStore(todoApp, persistedState);
//get data state from redux
store.subscribe(
  throttle(() => {
    saveState({
      Todo: store.getState().todos,
    });
  }, 1000)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <TodoList /> */}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root") as HTMLElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
