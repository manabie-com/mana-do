import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignInPage from './SignInPage';
import ToDoPage from './ToDoPage';
import useAppInit from './hooks/useAppInit';

import './App.css';

function App() {
  const { initAppDidMount } = useAppInit();
  useEffect(() => {
    initAppDidMount();
  }, []);
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignInPage}/>
          <Route path="/todo" component={ToDoPage}/>
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
