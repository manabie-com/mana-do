import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import NotFound from "./components/NotFound";
import SignInPage from "./features/SignIn/SignInPage";
import ToDoPage from "./features/Todo/ToDoPage";

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignInPage} />
          <Route path="/todo" component={ToDoPage} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
