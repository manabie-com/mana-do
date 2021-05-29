import React from "react";
import { Provider as SessionProvider } from "./containers/SessionProvider";

import { BrowserRouter } from "react-router-dom";

import "./App.css";
import Root from "./Root";

function App() {
  return (
    <SessionProvider>
      <main className="App">
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </main>
    </SessionProvider>
  );
}

export default App;
