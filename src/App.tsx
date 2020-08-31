import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';

import { Routes } from './routes';
import { store } from './store';

import './App.css';
function App() {
  return (
    <main className='App'>
      <Provider store={store}>
        <Suspense fallback='Loading'>
          <BrowserRouter>
            <Switch>
              <Routes />
            </Switch>
          </BrowserRouter>
        </Suspense>
      </Provider>
    </main>
  );
}

export default App;
