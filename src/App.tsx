import React from "react";

import { BrowserRouter as RouterProvider } from "react-router-dom";

import "./App.css";
import TodoProvider from "./store/contexts/todoContext";
import UserProvider from "./store/contexts/userContext";
import AuthCheck from "./auth/AuthCheck";
import { ManaDo_DB } from "./utils/localDatabase";
import { MANADO_DB } from "./constants";
import ManaDoModal from "./components/ManaDoModal";

function App() {
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    // Init database to localstorage
    if (!localStorage.getItem(MANADO_DB)) {
      localStorage.setItem(MANADO_DB, JSON.stringify(ManaDo_DB));
    }
  }, []);

  const handelCLock = () => {
    setShow(false);
  };

  return (
    <main className="App">
      <ManaDoModal show={show} onClickOutside={handelCLock} onClose={handelCLock}/>
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
