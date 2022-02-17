import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ToDoPage from './components/pages/to-do/ToDoPage';

import '../src/asset/main.scss';
import Login from './components/pages/login/Login';
import Register from './components/pages/register/register';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <main>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/todo' element={<ToDoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  );
}

export default App;
