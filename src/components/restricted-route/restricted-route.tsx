import React, { useEffect, useContext } from 'react'
import { Route, useHistory, RouteComponentProps, RouteProps } from 'react-router-dom'

import { AuthContext } from '../../store/contexts/auth'

import { useStorage } from '../../utils/hooks'
import { setToken } from '../../store/actions/auth'

interface RestrictedRouteProps extends RouteProps {
  component: React.FC<RouteComponentProps>
  path: string
}

const RestrictedRoute = ({ path, ...rest }: RestrictedRouteProps): JSX.Element => {
  const [data] = useStorage('token')
  const [, dispatch] = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    if (data === null || data === '') return

    dispatch(setToken(data))
    history.push('/todo')
  }, [data, history, dispatch])

  return <Route path={path} {...rest} />
}

export default RestrictedRoute
