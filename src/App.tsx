import React from 'react';

import ToDoPage from './components/page/ToDoPage';

import './App.css';
import ToDoPageProvider from './context/ToDoPageProvider';

function App() {
  return (
    <main className='App'>
      <ToDoPageProvider>
        <ToDoPage />
      </ToDoPageProvider>
    </main>
  );
}

export default App;
