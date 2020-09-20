import React from "react";
import Router from "./router";
import { StoreProvider } from "store/provider";
import { createBrowserHistory } from "history";

import "./App.css";

const App = () => {
  const history = createBrowserHistory();

  return (
    <div className="App">
      <StoreProvider>
        <Router history={history} />
      </StoreProvider>
    </div>
  );
};

export default App;
