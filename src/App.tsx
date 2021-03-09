import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignInPage from './components/SignInPage/SignInPage';
import TodoPage from './components/TodoPage/TodoPage';

import './App.css';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignInPage} />
          <Route path="/todo" component={TodoPage} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
