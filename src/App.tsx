import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import SignIn from './pages/SignIn/SignIn';
import ToDo from './pages/ToDo/ToDo';
import AuthRoute from './routes/AuthRoute';
import PrivateRoute from './routes/PrivateRoute';

function App() {
    /*
        I write 2 routes for redirecting:
        - AuthRoute: this is used for redirecting from / to /todo if user has logged in before and token has stored in local storage.
        - PrivateRoute: this is used for redirecting from other routes to / if user hasn't logged in before and token hasn't stored in local storage.
    */
    return (
        <main className="App">
            <BrowserRouter>
                <AuthRoute to='/todo' />
                <Switch>
                    <Route path="/" exact component={SignIn} />
                    <PrivateRoute path="/todo" component={ToDo} />
                </Switch>
            </BrowserRouter>
        </main>
    );
}

export default App;
