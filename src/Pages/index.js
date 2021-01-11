import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import SignInPage from "./SignInPage";
import ToDoPage from "./ToDoPage";

import { ProtectedRoute } from "../Comps";
import { loginPath, todosPath } from "../constant";

import "./index.css";

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route path={loginPath} exact component={SignInPage} />
          <ProtectedRoute path={todosPath} component={ToDoPage} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
