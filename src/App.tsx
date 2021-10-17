import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { IRoutes, routes } from './routes';

import './App.css';

const RouteWithSubRoutes = (route: IRoutes) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
};

function App() {
  return (
    <main className='App'>
      <Switch>
        {routes.map((route, index) => (
          <RouteWithSubRoutes key={`${index + 0}`} {...route} />
        ))}
      </Switch>
    </main>
  );
}

export default App;
