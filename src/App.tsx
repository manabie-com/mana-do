import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { userConfig } from "./config/user";
import NotFound from "./page/NotFound";
import SignInPage from "./page/SignInPage";
import ToDoPage from "./page/ToDoPage";

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
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
