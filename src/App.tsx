import React from "react";

import { BrowserRouter as RouterProvider } from "react-router-dom";
import { ManaDo_DB } from "./utils/localDatabase";
import { MANADO_DB } from "./constants";

import TodoProvider from "./store/contexts/todoContext";
import UserProvider from "./store/contexts/userContext";
import ConfirmModalProvider from "./_hooks/useConfirm/ConfirmModalProvider";
import AuthCheck from "./auth/AuthCheck";
import ConfirmProvider from "./store/contexts/confirmContext";

function App() {
  React.useEffect(() => {
    // Init database to localstorage
    if (!localStorage.getItem(MANADO_DB)) {
      localStorage.setItem(MANADO_DB, JSON.stringify(ManaDo_DB));
    }
  }, []);

  return (
    <main className="App">
      <RouterProvider>
        <UserProvider>
          <TodoProvider>
            <ConfirmProvider>
              <ConfirmModalProvider>
                <AuthCheck />
              </ConfirmModalProvider>
            </ConfirmProvider>
          </TodoProvider>
        </UserProvider>
      </RouterProvider>
    </main>
  );
}

export default App;
