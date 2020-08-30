import React from 'react';
import { useHistory } from 'react-router-dom';

import { getCachedToken, validateToken } from '../../utils';

export const AuthenticatedRoutes: React.FC = ({ children }) => {
  const history = useHistory();

  React.useEffect(() => {
    const token = getCachedToken();

    if (!validateToken(token)) {
      history.push(`/sign-in?redirectURL=${window.location.pathname}`);
    }
  }, [history]);

  return <>{children}</>;
};
