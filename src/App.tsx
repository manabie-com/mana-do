import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/common/PrivateRoute';
import PublicRoute from './components/common/PublicRoute';
import { Routing } from './routes';

function App() {
  return (
    <main className="App">
      <Switch>
        <Suspense fallback={<div>Loading</div>}>
          {Routing.map(route =>
            route.isPrivate ?
              (<PrivateRoute
                key={route.path}
                exact={route.exact}
                path={route.path}
                component={route.component}
              />)
              :
              (<PublicRoute
                key={route.path}
                exact={route.exact}
                path={route.path}
                component={route.component}
              />)
          )}
        </Suspense>
      </Switch>

    </main>
  );
}

export default App;
