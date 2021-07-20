import React, {useReducer} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import SignInPage from './SignInPage';
import ToDoPage from './ToDoPage';
import PrivateRoute from './PrivateRoute';

import './App.css';
import reducer, {AppState, initialState} from "./store/reducer";
import {initializerState} from "./utils/storeageUtils";
import {ROUTES} from "./utils/constants";

export type GlobalContextType = {
  state: AppState
  dispatch: Function
}

// @ts-ignore
export const StateContext = React.createContext<GlobalContextType>(initialState);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState, initializerState);
  const values = {
    state,
    dispatch
  }

  return (
    <StateContext.Provider value={{...values}}>
      <main className="App">
        <BrowserRouter>
          <Switch>
            <Route path={ROUTES.SIGN_IN} exact component={SignInPage}/>
            <PrivateRoute path={ROUTES.TODO}>
              <ToDoPage/>
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      </main>
      <ToastContainer />
    </StateContext.Provider>
  );
}

export default App;
