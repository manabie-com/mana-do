import React from 'react';
import CheckRoutes from 'CheckRoutes';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { SignInPage, ToDoPage } from 'components';

import './App.css';

function App() {
  return (
    <main className='App'>
      <BrowserRouter>
        <CheckRoutes>
          <Switch>
            <Route path='/todo' component={ToDoPage} />
            <Route path='/' component={SignInPage} />
          </Switch>
        </CheckRoutes>
      </BrowserRouter>
    </main>
  );
}

export default App;
