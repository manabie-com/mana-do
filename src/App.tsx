import React from 'react';

import ToDoPage from './pages/ToDoPage';

import './App.css';
import Header from './components/header';

function App() {
  return (
    <div>
      <Header />
      <main className="App">
        <ToDoPage />
      </main>
    </div>
  );
}

export default App;
