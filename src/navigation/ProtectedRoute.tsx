import * as React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {isGranted} from '../utils'
import {accountLayout} from './router.config'
import {APP_STORAGE_KEYS} from "../utils/appConst"

const ProtectedRoute = ({path, component: Component, permission, render, ...rest}: any) => {
  let isLoggedIn = localStorage.getItem(APP_STORAGE_KEYS.token)
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn) {
          return (
            <Redirect to={{pathname: accountLayout.accountLogin.path, state: {from: props.location}}}/>
          )
        }
        if (permission && !isGranted(permission)) {
          return (
            <Redirect to={{pathname: '/exception?type=401', state: {from: props.location}}}/>
          )
        }
        return Component ? <Component {...props} /> : render(props)
      }}
    />
  )
}

export default ProtectedRoute
