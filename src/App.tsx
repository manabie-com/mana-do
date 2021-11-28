import React, {PropsWithChildren} from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import SignInPage from './SignInPage';
import ToDoPage from './ToDoPage';

import './App.css';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={(props:PropsWithChildren<any>) => {
              const token = localStorage.getItem('token');
              if(token && token === 'testabc.xyz.ahk') {
                  props.history.push('/todo')
                  return <>Authenticated, Redirecting to Todo</>
              }
              return <SignInPage {...props}/>
          }}/>
          <Route path="/todo" component={(props:PropsWithChildren<any>) => {
              const token = localStorage.getItem('token');
              if(!token || token !== 'testabc.xyz.ahk') {
                  props.history.push('/')
                  return <>Permission denied</>
              }
              return <ToDoPage {...props}/>
          }}/>
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
