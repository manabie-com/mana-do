import React from "react";

import {
  BrowserRouter as RouterProvider,
  Switch,
  Route,
} from "react-router-dom";

import SignInPage from "./views/SignInPage";
import ToDoPage from "./views/ToDoPage";

import "./App.css";
import TodoProvider from "./store/ManaDo_todo/context";

function App() {
  return (
    <main className="App">
      <RouterProvider>
        <TodoProvider>
          <Switch>
            <Route path="/" exact component={SignInPage} />
            <Route path="/todo" component={ToDoPage} />
          </Switch>
        </TodoProvider>
      </RouterProvider>
    </main>
  );
}

export default App;
