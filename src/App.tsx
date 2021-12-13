import React from 'react'

import {BrowserRouter, Switch, Route} from 'react-router-dom'

import SignInPage from './pages/SignInPage'
import ToDoPage from './pages/ToDoPage'
import NotFoundPage from './pages/NotFoundPage'

import './App.css'

function App() {
  return (
    <main>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignInPage}/>
          <Route path="/todo" component={ToDoPage}/>
          <Route path="" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
