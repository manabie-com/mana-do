import React from "react";

import { BrowserRouter as RouterProvider } from "react-router-dom";

import "./App.css";
import TodoProvider from "./store/contexts/todoContext";
import UserProvider from "./store/contexts/userContext";
import AuthCheck from "./auth/AuthCheck";

function App() {
  return (
    <main className="App">
      <RouterProvider>
        <UserProvider>
          <TodoProvider>
            <AuthCheck />
          </TodoProvider>
        </UserProvider>
      </RouterProvider>
    </main>
  );
}

export default App;
