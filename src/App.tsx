/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import SignInPage from './modules/auth/SignInPage';
import ToDoPage from './modules/todo/ToDoPage';

import './App.css';
import { withPrivate, withPublic } from './hocs';
import { AuthContext } from './modules/auth/AuthContext';
import useAuthReducer from "./modules/auth/store";
import { verifyToken } from './modules/auth/store/actions';

function App() {
  const [state, dispatch] = useAuthReducer();

  useEffect(() => {
    dispatch(verifyToken());
  }, []);

  return (
    <main className="App">
      <AuthContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={withPublic(SignInPage)}/>
            <Route path="/todo" component={withPrivate(ToDoPage)}/>
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    </main>
  );
}

export default App;
