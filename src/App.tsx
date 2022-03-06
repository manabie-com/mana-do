import React from 'react';

import ToDoPage from './components/todo/ToDoPage';

import './App.css';
import { StoreProvider } from './store';

function App() {
  return (
    <StoreProvider>
      <main className="App">
        <ToDoPage />
      </main>
    </StoreProvider>
  );
}

export default App;
