import React, { useEffect } from 'react';

import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { IRoutes, routes, ROUTE_SIGNIN, ROUTE_TODO } from './routes';

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
  const history = useHistory();
  const { pathname = '' } = useLocation();

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      history.replace(ROUTE_SIGNIN);
    } else {
      if (pathname === ROUTE_SIGNIN) {
        // if go to Login page, app will redirect to ToDo page
        history.replace(ROUTE_TODO);
      }
    }
  };

  useEffect(() => {
    isAuthenticated();
  }, []);
  
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
