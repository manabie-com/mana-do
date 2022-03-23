import React from 'react';

import ToDoPage from './ToDoPage';
import Guide from './Guide';

import './App.css';

function App() {
  return (
    <main className="App row center mid">
      <div className='container row'>
        <ToDoPage />
        <Guide/>
      </div>
    </main>
  );
}

export default App;
