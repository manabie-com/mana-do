import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignInPage from './pages/signin';
import ToDoPage from './pages/todo';
import useAppInit from './hooks/useAppInit';
import ProtectedRoute from './component/protect-route/ProtectedRoute';

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
          <Route path="/" exact component={SignInPage}/>
          <ProtectedRoute path="/todo" component={ToDoPage}/>
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
