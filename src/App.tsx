import React from 'react';

import ToDoPage from './ToDoPage';

import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <main className="App">
      <ToDoPage />
      <ToastContainer position="bottom-left" hideProgressBar closeOnClick rtl={false} pauseOnFocusLoss draggable />
    </main>
  );
}

export default App;