import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth';
import SignInPage from './pages/SignIn';
import './App.css';
import ToDoPage from 'pages/ToDo';
import { useEffect, useState } from 'react';
import Loading from 'components/Loading';
import ProtectedRoute from 'router/ProtectedRoute';

function App() {
  const [isSlashScreen, setisSlashScreen] = useState(true);
  useEffect(() => {
    setTimeout(() => setisSlashScreen(false), 2000);
  }, []);
  return isSlashScreen ? (
    <Loading />
  ) : (
    <main className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/todo" element={<ProtectedRoute />}>
              <Route path="/todo" element={<ToDoPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </main>
  );
}

export default App;
