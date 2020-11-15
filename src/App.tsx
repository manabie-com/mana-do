import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import { AuthProvider } from './auth'
import ProtectedRoute from './components/ProtectedRoute'
import SignInPage from './pages/SignInPage';
import ToDoPage from './pages/ToDoPage';

import './App.css';

function App() {
  return (
    <main className="App">
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={SignInPage}/>
            {/* Use ProtectedRoute to disallow unauthenticated access */}
            <ProtectedRoute path='/todo' component={ToDoPage} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </main>
  );
}

export default App;
