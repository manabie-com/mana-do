import React, { Suspense, useEffect } from "react";

import { Switch, Route, BrowserRouter } from "react-router-dom";

import "./App.css";
import { AppRoutes } from "./configs/routers";
import { AuthContext } from "./modules/auth/AuthContext";
import useAuthReducer from "./modules/auth/store";
import authAction from "./modules/auth/store/auth.action";

const App = () => {
  const [state, dispatch] = useAuthReducer();

  useEffect(() => {
    dispatch(authAction.verifyToken());
  }, []);

  const routes = AppRoutes.getRoutes().map((route) => {
    return <Route key={route.path} {...route} />;
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Suspense fallback={<p>Loading</p>}>
          <Switch>{routes}</Switch>
        </Suspense>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
