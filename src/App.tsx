import React from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import SignInPage from "./components/SignInPage/SignInPage";
import ToDoPage from "./components/ToDoPage/ToDoPage";

import "./App.css";

function App() {
  const tokenValid = localStorage.getItem("token") === "testabc.xyz.ahk";
  return (
    <main className="App">
      <BrowserRouter>
        <Route
          exact
          path="/todo"
          render={() =>
            tokenValid ? <Redirect to="/todo" /> : <Redirect to="/" />
          }
        />
        <Switch>
          <Route path="/" exact component={SignInPage} />
          <Route path="/todo" component={ToDoPage} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
