import React from 'react';
import Router from './navigation/index'
import './App.css';

function App() {
  return (
    <main className="App" data-testid="root-app">
      <Router />
    </main>
  );
}

export default App;
