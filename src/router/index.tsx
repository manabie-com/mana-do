import React, { Suspense, useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StoreContext } from "store/provider";
import { History} from "history";
import Auth from "auth";
import { PublicTemplate } from "components";

const privateRoutes = [
  {
    path: "/todo",
    component: React.lazy(() => import("components/pages/ToDoPage")),
    exact: true,
  }
];

const publicRoutes = [
  {
    path: "/",
    component: React.lazy(() => import("components/pages/SignInPage")),
    exact: false,
  },
];

type Props = { 
  history: History 
}

const Router = ({ history } : Props) => {
  const { state } = useContext(StoreContext);
  
  const routes = state.auth ? [...privateRoutes, ...publicRoutes] : [...publicRoutes];

  return (
    <BrowserRouter>
      <Auth history={history}>
        <PublicTemplate>
          <Suspense fallback={<div>... Loading</div>}>
              <Switch>
                {routes.map(({ path, component, exact }) => {
                  return (
                    <Route
                      path={path}
                      key={path}
                      exact={exact}
                      component={component}
                    />
                  );
                })}
              </Switch>
            </Suspense>
          </PublicTemplate>
        </Auth>
    </BrowserRouter>
  );
};

export default Router;
