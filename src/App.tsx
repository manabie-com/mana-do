import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignInPage from './pages/signin';
import ToDoPage from './pages/todo';

import './App.css';

function App() {
  return (
    <main className='App'>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={SignInPage} />
          <Route path='/todo' component={ToDoPage} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
