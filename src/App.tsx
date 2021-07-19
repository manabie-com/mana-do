import React, { useReducer } from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import SignInPage from './pages/login/SignInPage';
import ToDoPage from './pages/dashboard/ToDoPage';
import RegisterPage from './pages/register/RegisterPage';
import './App.css';
import './assets/global.css';
import reducer, {initialState} from './store/reducer';
import { AppContext } from './store/context';



function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{state, dispatch}}>
      <div className="content-wrapper">
        <main className="App">
          <BrowserRouter>
            <Switch>
              <Route path="/" exact>
                <SignInPage />
              </Route>
              <Route path="/todo" component={ToDoPage}/>
              <Route path='/register' exact>
                <RegisterPage></RegisterPage>
              </Route>
              {/* DEFAULT ROUTE */}
              <Route component={SignInPage} />
            </Switch>
          </BrowserRouter>
        </main>
      </div>
   </AppContext.Provider>
  );
}

export default App;
