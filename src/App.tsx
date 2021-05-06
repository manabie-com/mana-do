import React, { lazy, Suspense } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import SignInPage from './views/Signin/SignInPage';
// import ToDoPage from './views/Todo/ToDoPage';
import './App.css';

const ToDoPage = lazy(() => import('./views/Todo/ToDoPage'));
const NotFound = lazy(() => import('./views/NotFound/NotFound'));

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Suspense fallback={<div className="overlay d-flex"><p>Loading...</p></div>}>
          <Switch>
            <Route path="/" exact component={SignInPage}/>
            <Route path="/todo" component={ToDoPage}/>
            <Route path="*" component={NotFound}/>
          </Switch>
        </Suspense>
      </BrowserRouter>
    </main>
  );
}

export default App;
