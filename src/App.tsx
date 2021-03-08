import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import ContextProvider from "./context";
import { IsUserRedirect, ProtectedRoute } from "./helper/routes";
import SignInPage from "./pages/SignInPage/SignInPage";
import ToDoPage from "./pages/ToDoPage/ToDoPage";

function App() {
  const user = localStorage.getItem("token") || "";

  return (
    <ContextProvider>
      <main className="App">
        {/* if User don't have token in localStorage then can't go to todo page
        => redirect to signin page
        
        if have seted token then don't need to login => redirect to todo page*/}
        <BrowserRouter>
          <Switch>
            <IsUserRedirect path="/" exact user={user} loggedInPath="/todo">
              <SignInPage />
            </IsUserRedirect>

            <ProtectedRoute path="/todo" user={user}>
              <ToDoPage />
            </ProtectedRoute>
          </Switch>
        </BrowserRouter>
      </main>
    </ContextProvider>
  );
}

export default App;
