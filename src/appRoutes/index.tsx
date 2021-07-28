import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import appRoutes, { IAppRoute } from './routes'
import Loading from 'root/components/loading'

function App() {
  return (
    <main className='App'>
      <BrowserRouter>
        <React.Suspense fallback={<Loading />}>
          <Switch>
            {appRoutes.map((route: IAppRoute) => (
              <Route key={route.key} path={route.path} exact={route.exact} component={route.component} />
            ))}
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </main>
  );
}

export default App;
