import React from 'react';
import ToDoPage from './pages/ToDo/ToDoPage';
import './App.css';
import { AppProvider } from './context/toDoContext';

function App() {
  return (
    <main className='App'>
      <AppProvider>
        <ToDoPage />
      </AppProvider>
    </main>
  );
}

export default App;
