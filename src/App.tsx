import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import PrivateRoute from "./layouts/PrivateRoute";

import SignInPage from "./layouts/SignInPage";
import ToDoPage from "./layouts/ToDoPage";

import "./App.css";

function App() {
  return (
    <main className="main_visual">
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <SignInPage />
          </Route>
          <PrivateRoute path="/">
            <ToDoPage />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
