import { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Control the authenticated state
function useAuth() {
  const history = useHistory();
  const [isAuthenticated, setAuthenticated] = useState<boolean>(
    !!localStorage.getItem('token')
  );

  const signIn = (token: string) => {
    localStorage.setItem('token', token);
    setAuthenticated(true);
    history.push('/todo');
  };

  return {
    isAuthenticated,
    signIn,
  };
}

export default useAuth;
