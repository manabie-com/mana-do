import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import appRoutes, { IAppRoute } from './routes'

function App() {
  return (
    <main className='App'>
      <BrowserRouter>
        <Switch>
          {appRoutes.map((route: IAppRoute) => (
            <Route key={route.key} path={route.path} exact={route.exact} component={route.component} />
          ))}
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
