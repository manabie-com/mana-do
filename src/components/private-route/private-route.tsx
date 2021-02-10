import React, { useContext } from 'react'
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom'

import { AuthContext } from '../../store/contexts/auth'

import Spinner from '../spinner'

interface PrivateRouteProps extends RouteProps {
  component: React.FC<RouteComponentProps>
  path: string
}

const PrivateRoute = ({ component: Component, path, ...rest }: PrivateRouteProps): JSX.Element => {
  const [{ isAuthenticated, loading }] = useContext(AuthContext)

  return (
    <Route
      path={path}
      render={props => (
        <>
          {loading && <Spinner />}
          {!loading && isAuthenticated && <Component {...props} />}
          {!isAuthenticated && <Redirect to={{ pathname: '/' }} />}
        </>
      )}
      {...rest}
    />
  )
}

export default PrivateRoute
