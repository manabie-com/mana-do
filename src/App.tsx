import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignInPage from './SignInPage';
import ToDoPage from './ToDoPage';

import './App.css';
import todoList from './store/views';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignInPage} />
          <Route path="/todo" component={todoList} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
