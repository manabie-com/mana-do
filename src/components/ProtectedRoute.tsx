import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'

import { useAuth } from '../auth'

import Loading from './Loading'

export default (props: RouteProps) => {
  const { token, isLoading, error } = useAuth()

  if (isLoading) return <Loading />
  if (!token || error) return <Redirect to='/' />
  return <Route {...props} />
}
