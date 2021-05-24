import React, {useEffect} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import useAuthReducer from './store/auth/AuthReducer';
import AuthActionsCreator from './store/auth/AuthActions';

import Layout from './components/layout/Layout';
import Login from './containers/login/Login';
import ToDo from './containers/todo/Todo';
import AuthContext from './context/AuthContext';
import './styles/app.scss';

function App() {
  const [authState, dispatch] = useAuthReducer();
  const {token} = authState;
  useEffect(() => {
    dispatch(AuthActionsCreator.autoLogin())
  }, []);
  if (!token) {
    return (
      <AuthContext.Provider value={{authState, dispatch}}>
        <Login/>
      </AuthContext.Provider>
    );
  }
  return (
    <AuthContext.Provider value={{authState, dispatch}}>
      <main className="App">
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/" exact component={ToDo}/>
              <Redirect to={"/"}/>
            </Switch>
          </Layout>
        </BrowserRouter>
      </main>
    </AuthContext.Provider>
  );
}

export default App;
