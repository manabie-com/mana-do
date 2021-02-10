import React, { useContext } from 'react'
import { Route, Redirect, RouteComponentProps } from 'react-router-dom'

import { AuthContext } from '../../store/contexts/auth'

interface PrivateRouteProps {
  component: React.FC<RouteComponentProps>
  path: string
}

const PrivateRoute = ({ component: Component, path, ...rest }: PrivateRouteProps): JSX.Element => {
  const [state] = useContext(AuthContext)
  const { isAuthenticated } = state

  return (
    <Route
      path={path}
      render={props => isAuthenticated
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/' }} />}
      {...rest}
    />
  )
}

export default PrivateRoute
