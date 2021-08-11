import React from 'react';
import DefaultTemplate from './components/Templates/DefaultTemplate';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import SignInPage from './pages/signin/SignInPage';
import ToDoPage from './pages/todo/ToDoPage';

import './App.css';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <DefaultTemplate>
          <React.Suspense fallback="Loading...">
            <Switch>
              <Route path="/" exact component={SignInPage}/>
              <Route path="/todo" component={ToDoPage}/>
              <Route path="*"  exact component={() => null} />
            </Switch>
          </React.Suspense>
        </DefaultTemplate>
      </BrowserRouter>
    </main>
  );
}

export default App;
