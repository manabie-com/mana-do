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
  const [todoStore, dispatchTodo] = useReducerReact(reducer, initialState);
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (a) => a,
    'todosState'
  );

  useEffect(() => {
    const handler = () => {
      console.log(state);
      // localStorage.setItem('state', JSON.stringify(state));
      console.log(JSON.stringify(state.todos));

      localStorage.setItem('todos', JSON.stringify(state.todos));
    };

    window.addEventListener('beforeunload', handler);

    return () => {
      window.removeEventListener('beforeunload', handler);
    };
  }, [state]);

  // useEffect(() => {}, [Auth.isAuthenticated]);

  // console.log(Auth.isAuthenticated);

  return (
    <main className='App'>
      <TodoContext.Provider value={{ todoStore, dispatchTodo }}>
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
