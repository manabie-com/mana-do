import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import appRoutes, { IAppRoute } from './routes'
import Loading from 'root/components/loading'

function App() {
  return (
    <main className='App'>
      <BrowserRouter>
        <Switch>
          {appRoutes.map((route: IAppRoute) => (
            route.lazyLoad ? <React.Suspense key={route.key} fallback={<Loading />}>
              <Route path={route.path} exact={route.exact} component={route.component} />
            </React.Suspense>
            : <Route path={route.path} exact={route.exact} component={route.component} />
          ))}
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
