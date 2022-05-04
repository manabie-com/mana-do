import React, { useEffect, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import SignInPage from "./pages/SignInPage";
import ToDoPage from "./pages/ToDoPage";
import PrivateRoute from "./components/PrivateRoute";

import reducer, { initialState } from "./store/reducer";
import { initializerState, storeReducerStorage } from "./utils/storageUtils";
import { ROUTES } from "./utils/constants";
import StateContext from "./AppContext";
import { Wrapper } from "./AppStyles";
import Layout from "./layouts/main";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState, initializerState);
  const values = {
    state,
    dispatch,
  };

  useEffect(() => {
    if (state) {
      storeReducerStorage(state);
      document.documentElement.className = state.theme;
    }
  }, [state]);

  return (
    <Wrapper>
      <StateContext.Provider value={{ ...values }}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
              <Route
                path={ROUTES.TODO}
                element={
                  <PrivateRoute>
                    <ToDoPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Layout>
        </BrowserRouter>
        <ToastContainer />
      </StateContext.Provider>
    </Wrapper>
  );
}

export default App;
