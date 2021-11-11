import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import AppNavigation from './shared/AppNavigation';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <AppNavigation />
      </BrowserRouter>
    </main>
  );
}

export default App;
