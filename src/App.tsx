import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import userConfig from "./config/user";

import SignInPage from "./SignInPage";
import ToDoPage from "./ToDoPage";

import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route path={userConfig.loginPath} exact component={SignInPage} />
          <ProtectedRoute
            path={userConfig.todoPath}
            exact
            component={ToDoPage}
          />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
