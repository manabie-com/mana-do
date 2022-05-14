import React, { lazy } from 'react';

export const ToDoPage = lazy(() => import('./screen/todo'));

import './App.css';

function App() {
  return (
    <main className='App'>
      <ToDoPage />
    </main>
  );
}

export default App;
