import React from 'react';

import ToDoPage from './ToDoPage';

import './App.css';

function App() {
  return (
    <main className="App">
      <h1 className='App-title'>To Do List</h1>
      <ToDoPage />
      <div className="Todo__tooltip_icon">
        ?
        <span className="Todo__tooltip"> Double click on items to edit!</span>
      </div>
      <footer>Manado © 2022</footer>
    </main>
  );
}

export default App;
