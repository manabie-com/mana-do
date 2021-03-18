import React from "react";

import { BrowserRouter as RouterProvider } from "react-router-dom";

import "./App.css";
import TodoProvider from "./store/contexts/todoContext";
import UserProvider from "./store/contexts/userContext";
import AuthCheck from "./auth/AuthCheck";
import { IManaDo_DB } from "./utils/dbType";
import shortid from "shortid";

function App() {
  React.useEffect(() => {
    // Init database to localstorage
    const db = {
      todos: [
        {
          content: "ASDASD",
          created_date: new Date().toISOString(),
          status: "COMPLETED",
          id: shortid(),
          user_id: "firstUser",
        },
      ],
    } as IManaDo_DB;

    localStorage.setItem("MANADO_DB", JSON.stringify(db));
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
