import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { layoutRouter } from './router.config'
import {Redirect} from "react-router"

const Router = () => {
  const AccountLayout = layoutRouter.accountLayout
  const AppLayout = layoutRouter.portalLayout

  return (
    <Switch>
      <Route path="/account" render={(props: any) => <AccountLayout {...props} />} />
      <ProtectedRoute path="/todo" render={(props: any) => <AppLayout {...props} exact />} />
      <Redirect to="/todo" />
    </Switch>
  )
}

export default Router
