import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFound from "./pages/notFound";
import SignInPage from "./pages/signInPage";
import ToDoPage from "./pages/todoPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/" exact component={SignInPage} />
        <PrivateRoute path="/todo" component={ToDoPage} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
