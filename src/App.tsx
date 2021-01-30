import React, {useEffect} from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import SignInPage from './pages/SignInPage/index';
import ToDoPage from './pages/ToDoPage/index'

import './App.css';
import reducer, { initialState } from 'store/reducer';
import { useReducer } from 'reinspect';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState, (a) => a, 'todosState');
  
  useEffect(() => {
    const handler = () => {
      localStorage.setItem('ahihi', '123');
      console.log(state);
      localStorage.setItem('state', JSON.stringify(state));
    };

    window.addEventListener('beforeunload', handler);

    return () => {
      window.removeEventListener('beforeunload', handler);
    };
  }, [state])

  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignInPage}/>
          <Route path="/todo" component={ToDoPage}/>
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
