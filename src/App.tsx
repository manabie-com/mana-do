import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "components/commons";

import SignInPage from "pages/SignInPage";
import ToDoPage from "pages/ToDoPage";

import "./styles/variables.css";
import "./styles/common.css";

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignInPage} />
          <PrivateRoute path="/todo" component={ToDoPage} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
