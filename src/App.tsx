import React from "react";

import { BrowserRouter as RouterProvider } from "react-router-dom";

import "./App.css";
import TodoProvider from "./store/ManaDo_todo/context";
import AuthCheck from "./auth/AuthCheck";

function App() {
  return (
    <main className="App">
      <RouterProvider>
        <TodoProvider>
          <AuthCheck />
        </TodoProvider>
      </RouterProvider>
    </main>
  );
}

export default App;
