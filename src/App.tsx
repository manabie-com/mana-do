import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';

const SignInPage = lazy(() => import('./SignInPage'));
const ToDoPage = lazy(() => import('./ToDoPage'));


function App() {
  return (
    <main className="App">
      <BrowserRouter>
      <Suspense fallback={null}> 
        <Switch>
          <Route path="/" exact component={SignInPage}/>
          <Route path="/todo" component={ToDoPage}/>
        </Switch>
        </Suspense>
      </BrowserRouter>
    </main>
  );
}

export default App;
