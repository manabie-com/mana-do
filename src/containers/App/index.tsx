import React, { useReducer } from "react";

import { BrowserRouter } from "react-router-dom";
import { AuthRouters, PublicRoutes } from "../../routes/routes";
import reducer, { initialState } from "../../store/reducer";

import "./App.css";

function App() {
  const [, dispatch] = useReducer(reducer, initialState);
  return (
    <main className="App">
      <div className="Body">
        <BrowserRouter>
          {!localStorage.getItem("token") ? (
            <PublicRoutes dispatch={dispatch} />
          ) : (
            <AuthRouters />
          )}
        </BrowserRouter>
      </div>
    </main>
  );
}

export default App;
