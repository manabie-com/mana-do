import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// Move page-display components to /pages and create /components
// for reusable components
import PrivateRoute from './components/PrivateRoute';
import SignInPage from './pages/SignIn';
import ToDoPage from './pages/Todo';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/sign-in" exact component={SignInPage} />
        <PrivateRoute path="/todo" component={ToDoPage} />
        <Route path={'*'}>
          <Redirect to={'/todo'} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
