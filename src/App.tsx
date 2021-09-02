import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Navbar from "components/organism/Navbar";
import "./App.css";

const SignInPage = React.lazy(() => import("pages/SignInPage"));
const ToDoPage = React.lazy(() => import("pages/ToDoPage"));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <main className="App">
          <Switch>
            <Route path="/" exact component={SignInPage} />
            <PrivateRoute path="/todo" component={ToDoPage} />
          </Switch>
        </main>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
