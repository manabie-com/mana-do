import React from "react";

import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from "react-router-dom";

import SignInPage from "./components/SignInPage";
import ToDoPage from "./components/ToDoPage";
import { UserInfoProvider, useUserInfo } from "./context/UserInfoContext";
import StorageController from './utils/storage'
import {setLogin} from './context/actions'

import "./App.css";

function App() {
  const { state: stateInfo, dispatch: dispatchInfo } = useUserInfo();
  const PrivateRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
    let finalComponent = component;
    if(!stateInfo.isLoggedIn){
      let currentSession = StorageController.getCookieStorage();
      if(currentSession){
        if(currentSession.expiration - new Date().getTime() <= 0){
          StorageController.removeCookieStorage();
          finalComponent = SignInPage;
        }else{
          dispatchInfo(setLogin(currentSession.username))
        }
      }
    }
    return <Route {...rest} component={finalComponent} />;
  };

  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignInPage} />
          <PrivateRoute path="/todo" component={ToDoPage} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
