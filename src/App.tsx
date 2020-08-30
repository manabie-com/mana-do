import React, { Suspense } from 'react';

import { BrowserRouter, Switch } from 'react-router-dom';

import './App.css';

import { Routes } from './routes';

function App() {
  return (
    <main className='App'>
      <Suspense fallback='Loading'>
        <BrowserRouter>
          <Switch>
            <Routes />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </main>
  );
}

export default App;
