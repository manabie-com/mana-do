import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ToDoPage from './components/pages/to-do/ToDoPage';

import '../src/asset/main.scss';
import Login from './components/pages/login/Login';
import Register from './components/pages/register/register';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/todo' element={<ToDoPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
