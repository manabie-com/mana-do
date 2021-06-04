import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from 'routes';
import './App.css';

function App() {
  return (
    <main className="App">
      <Suspense fallback={'<div>Loading...</div>'}>
        <BrowserRouter>
          <Switch>
            {routes.map(({ path, loadComponent, exact = true }) => (
              <Route
                key={path}
                path={path}
                component={loadComponent}
                exact={exact}
              />
            ))}
          </Switch>
        </BrowserRouter>
      </Suspense>
    </main>
  );
}

export default App;
