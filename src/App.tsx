import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import useAppInit from './hooks/useAppInit';
import ProtectedRoute from './component/protect-route/ProtectedRoute';
import { Home, Todo } from './router';

import './App.css';

function App() {
  const { initAppDidMount } = useAppInit();
  useEffect(() => {
    initAppDidMount();
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}/>
          <ProtectedRoute path="/todo" component={Todo}/>
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
