import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import {ToDoPage} from './page/ToDoPage';
import {LoginPage} from './page/LoginPage';
import {Page404} from './page/Page404';

import {ProtectedRoute} from './components/ProtectedRoute'

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <main className="App">
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <ProtectedRoute path="/">
            <ToDoPage />
          </ProtectedRoute>
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
