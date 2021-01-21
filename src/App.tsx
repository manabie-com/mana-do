import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Auth from "./Auth/Auth";
import SignInPage from "./Auth/SignInPage";
import ToDoPage from "./Todo/ToDoPage";

import "./App.css";

function App() {
  return (
    <main className="App">
      <Auth>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={SignInPage} />
            <Route path="/todo" component={ToDoPage} />
          </Switch>
        </BrowserRouter>
      </Auth>
    </main>
  );
}

export default App;
