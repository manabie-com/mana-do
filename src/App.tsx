import React from 'react';

import {BrowserRouter, Switch, Route,Redirect} from 'react-router-dom';

import SignInPage from './features/Login/SignInPage';
import ToDoPage from './features/Todo/index';
import Error404 from './features/Error404View/Error404View';
import ToastComponent from "./components/toast";

import './App.css';

// routes
import AuthGuard from './guards/AuthGuard';
import GuestGuard from './guards/GuestGuard';

import { useSelector } from 'react-redux';
import { accessTokenSelector } from './selectors/auth.selector';

function App() {
  const accessToken = useSelector(accessTokenSelector) ||localStorage.getItem("token")
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {accessToken ?<Redirect to="/todo"/> : <Redirect to="/login" />}
          </Route>
          <GuestGuard path="/login" isAuthenticated={accessToken ? true : false} component={SignInPage} />
          <AuthGuard path="/todo" isAuthenticated={accessToken ? true : false} component={ToDoPage} />
          <Route path="*" component={Error404} />
        </Switch>
        <ToastComponent/>
      </BrowserRouter>
    </main>
  );
}

export default App;
