import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import SignInPage from './pages/SignInPage';
import ToDoPage from './pages/ToDoPage';

import './App.css';
import Spinner from './components/Loading/LoadingSpinner';

function App() {
  return (
    <main className="App">
      <Spinner />
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
