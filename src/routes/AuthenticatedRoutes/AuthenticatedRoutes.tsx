import React from 'react';
import { useHistory } from 'react-router-dom';

import { getCachedToken, validateToken } from '../../utils';
import { RoutePath } from '../Routes';

export const AuthenticatedRoutes: React.FC = ({ children }) => {
  const history = useHistory();

  React.useEffect(() => {
    const token = getCachedToken();

    if (!validateToken(token)) {
      history.push(`${RoutePath.signIn}?redirectURL=${window.location.pathname}`);
    }
  }, [history]);

  return <>{children}</>;
};
