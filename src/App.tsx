import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { routes } from "./routes";
import PrivateRoute from "./components/PrivateComponent";
import PublicComponent from "./components/PublicComponent";
import "./styles/App.css";

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          {routes.map((route) => {
            if (route.private) {
              return (
                <PrivateRoute
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              );
            }

            return (
              <PublicComponent
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            );
          })}
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
