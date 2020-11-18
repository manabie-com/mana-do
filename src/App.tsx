import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import SignInPage from './components/SignInPage/SignInPage';
import ToDoPage from './components/ToDoPage/ToDoPage';
import { LOGIN_KEYS } from './models/auth';
import { AUTH_VALUE } from './resource/constant';

const App = () => {
  localStorage.setItem(LOGIN_KEYS.userId, AUTH_VALUE.userId);
  localStorage.setItem(LOGIN_KEYS.password, AUTH_VALUE.password);

  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignInPage} />
          <Route path="/todo" component={ToDoPage} />
        </Switch>
      </BrowserRouter>
    </main>
  );
};

export default App;
