import { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PRIVATE_PATHS, PUBLIC_PATHS } from 'setup';

const CheckRoutes = memo((props: any) => {
  const { children } = props;
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(PRIVATE_PATHS, PUBLIC_PATHS, history.location.pathname)
    if (token) {
      // TODO revalidate token in localstorage
      // currently let it be true if localstorage has token
      setIsLoggedIn(true);
      if (history.location.pathname === '/') {
        history.push('/todo');
      }
    } else {
      setIsLoggedIn(false);
      if ((PRIVATE_PATHS.includes(history.location.pathname) && !isLoggedIn)) {
        history.push('/')
      }
    }
  }, [history.location.pathname, history, isLoggedIn]);

  return children
});

export default CheckRoutes;
