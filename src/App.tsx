import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import SignInPage from "./SignInPage";
import ToDoPage from "./containers/todoList";
import "bootstrap/dist/css/bootstrap.css";
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
