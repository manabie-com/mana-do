import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignInPage from "component/SignIn";
import ToDoPage from "component/Todo";
import NoMatch from "component/404/index";
import "./App.css";

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignInPage} />
          <Route path="/todo" component={ToDoPage} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
