import React from 'react';

import ToDoPage from './ToDoPage';

import './App.css';

import { TodoProvider } from './todo/contexts/TodoProvider';
import ErrorBoundary from './error/ErrorBoundary';

function App() {
 
  return (
    <main className="App">
    <ErrorBoundary>
    <TodoProvider>
      
        <div className="todoForm">
          <ToDoPage />
        </div>
      
    </TodoProvider>
    </ErrorBoundary>
    </main>
  );
}

export default App;
