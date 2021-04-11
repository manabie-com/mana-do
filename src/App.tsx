import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToDoPage, SignInPage } from "./components/containers";

import "./App.css";

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignInPage} />
          <Route path="/todo" component={ToDoPage} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
