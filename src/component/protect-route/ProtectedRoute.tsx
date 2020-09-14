import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { AppState } from '../../store/root/app.reducer';

interface Props {
  redirectPath?: string,
}

const ProtectedRoute: React.FC<Props & RouteProps> = (props) => {
  const { isLogin } = useSelector((state: AppState) => state.auth);
  if (!isLogin) {
    return <Redirect to={{ pathname: props.redirectPath }}></Redirect>
  }
  return <Route component={props.component} />;
};

export default ProtectedRoute;

