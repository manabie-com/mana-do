import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from 'routes';
import PrivateRoutes from 'routes/PrivateRoutes';
import './App.css';

function App() {
  return (
    <main className="App">
      <Suspense fallback={'<div>Loading...</div>'}>
        <BrowserRouter>
          <Switch>
            {routes.map(({ path, loadComponent, exact = true, isPrivate }) =>
              isPrivate ? (
                <PrivateRoutes key={path}>
                  <Route path={path} component={loadComponent} exact={exact} />
                </PrivateRoutes>
              ) : (
                <Route
                  key={path}
                  path={path}
                  component={loadComponent}
                  exact={exact}
                />
              )
            )}
          </Switch>
        </BrowserRouter>
      </Suspense>
    </main>
  );
}

export default App;
