import React from 'react'

import { Route, RouteProps, Redirect } from "react-router-dom"

import StorageService from '../../service/StorageService'
import { STORAGE_TOKEN } from '../../utils/constant'

const ProtectedRoute = (props: RouteProps) => {
  const { children, path, ...routerProps } = props

  const authStorageService = new StorageService(STORAGE_TOKEN, '')
  const token = authStorageService.get()

  const renderComponent = () => {
    if (token) {
      return children
    }
    return <Redirect to={{ pathname: '/login'}} />
  }

  return (
    <Route {...routerProps} path={path} render={renderComponent} />
  )
}

export {ProtectedRoute}