import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  //Strict mode can’t automatically detect side effects for you, 
  //but it can help you spot them by making them a little more deterministic. 
  //This is done by intentionally double-invoking the following functions: [...] 
  //Functions passed to useState, useMemo, or useReducer
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
