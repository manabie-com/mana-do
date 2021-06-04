import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import SignInPage from './features/login/SignInPage';
import ToDoPage from './features/todo/ToDoPage';

function App() {
  return (
    <main className='App'>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={SignInPage}/>
          <Route path='/todo' component={ToDoPage}/>
        </Switch>
      </BrowserRouter>
    </main>
  );
}
export default App;
