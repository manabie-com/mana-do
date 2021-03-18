import React from "react";

import { BrowserRouter as RouterProvider } from "react-router-dom";

import "./App.css";
import TodoProvider from "./store/contexts/todoContext";
import UserProvider from "./store/contexts/userContext";
import AuthCheck from "./auth/AuthCheck";
import { ManaDo_DB } from "./utils/localDatabase";
import { MANADO_DB } from "./constants";

function App() {
  React.useEffect(() => {
    // Init database to localstorage
    localStorage.setItem(MANADO_DB, JSON.stringify(ManaDo_DB));
  }, []);

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
