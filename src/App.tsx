import React, {
  useEffect,
  createContext,
  useReducer as useReducerReact
} from 'react';
import { useReducer } from 'reinspect';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from 'routes/PrivateRoute';

import SignInPage from './pages/SignIn/index';
import ToDoPage from './pages/ToDo/index';

import reducer, { initialState } from 'store/reducer';
import './App.css';
import NotFound from 'pages/NotFound';
// import Auth from 'service/auth';

export const TodoContext = createContext({});

const App = () => {
  const [store, dispatch] = useReducer(
    reducer,
    initialState,
    (a) => a,
    'globalStore'
  );

  useEffect(() => {
    const handler = () => {
      console.log(store);
      // localStorage.setItem('state', JSON.stringify(state));
      console.log(JSON.stringify(store.todos));

      localStorage.setItem('todos', JSON.stringify(store.todos));
    };

    window.addEventListener('beforeunload', handler);

    return () => {
      window.removeEventListener('beforeunload', handler);
    };
  }, [store]);

  // useEffect(() => {}, [Auth.isAuthenticated]);

  // console.log(Auth.isAuthenticated);

  return (
    <main className='App'>
      <TodoContext.Provider value={{ store, dispatch }}>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={SignInPage} />
            <PrivateRoute path='/todo' component={ToDoPage} />
            <Route path='/' component={NotFound} />
          </Switch>
        </BrowserRouter>
      </TodoContext.Provider>
    </main>
  );
};

export default App;
