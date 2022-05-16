import React, { lazy, Suspense } from 'react';

export const TodoPage = lazy(() => import('./screen/todo'));

import './App.css';

function App() {
  return (
    <Suspense fallback={<></>}>
      <main className='App'>
        <TodoPage />
      </main>
    </Suspense>
  );
}

export default App;
