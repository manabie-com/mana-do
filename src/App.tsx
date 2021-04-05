import "src/styles/App.css";

import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

/* Components */
import SignInPage from "src/pages/SignIn";
import ToDoPage from "src/pages/Todo";

function App() {
  const renderComponent = (direct: string, Component: () => JSX.Element, isRender: boolean) => ({...props}) => {
    const token = localStorage.getItem("token");
    const isAuthenticated = token !== null && token !== undefined;

    if (isRender !== isAuthenticated) {
      return <Component {...props} />;
    }
    return <Redirect to={direct} />;
  };

  return (
    <main className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={renderComponent("/todo", SignInPage, true)} />
          <Route path="/todo" render={renderComponent("/", ToDoPage, false)} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
