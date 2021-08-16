import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignInPage from './Pages/Login/SignInPage';// Move to Pages folder, all page will be here
import ToDoPage from './Pages/Todo/ToDoPage';// Move to Pages folder, all page will be here
import "./i18n";
import PrivateRoute from './component/PrivateRouter/PrivateRouter';
function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignInPage} />
          <PrivateRoute>
            <Route path="/todo" exact component={ToDoPage} />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </main>

  );
}

export default App;
