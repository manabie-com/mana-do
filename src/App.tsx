import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import SignInPage from "./pages/SignIn";
import ToDoPage from "./pages/ToDo";

import "./App.css";
import NotFoundPage from "./pages/NotFound";

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignInPage} />
          <Route path="/todo" exact component={ToDoPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
