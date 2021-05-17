/**
 * I created simple authentication rule
 * Every private route need to check token has been saved in localstorage, 
 * if passed continue access current route, but not we redirect to path / (login)
 * I do same action in SignInComponent.
 */
import React from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import SignInPage from "./SignInPage";
import ToDoPage from "./ToDoPage";

import "./App.css";
import { isAuthenticated } from "./utils";

function AuthenticatedRoute({ component: Component, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated() ? <Component {...props} /> : <Redirect to="/" />} />
  );
}

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignInPage} />
          <AuthenticatedRoute path="/todo" component={ToDoPage} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
