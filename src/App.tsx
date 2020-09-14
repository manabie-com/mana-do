import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./utils/history";

const SignInPage = lazy(() => import("./pages/sign-in"));
const ToDoPage = lazy(() => import("./pages/to-do"));

function App() {
  return (
    <main className="App">
      <Router history={history}>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/" exact component={SignInPage} />
            <Route path="/todo" exact component={ToDoPage} />
          </Switch>
        </Suspense>
      </Router>
    </main>
  );
}

export default App;
