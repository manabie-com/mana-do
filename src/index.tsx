import React from "react";
import ReactDOM from "react-dom";
import App from "App/index";
import * as serviceWorker from "./serviceWorker";

// NOTE: Config redux store
import { Provider } from "react-redux";
import { store } from "store/store";

// NOTE: Config theme using styled component
// Docs: https://styled-components.com/
import theme from "themes/theme";
import { ThemeProvider } from "styled-components";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
