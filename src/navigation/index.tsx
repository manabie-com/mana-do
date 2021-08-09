import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { layoutRouter } from './router.config'

const Router = () => {
  const AccountLayout = layoutRouter.accountLayout
  const AppLayout = layoutRouter.portalLayout

  return (
    <Switch>
      <Route path="/account" render={(props: any) => <AccountLayout {...props} />} />
      <ProtectedRoute path="/" render={(props: any) => <AppLayout {...props} exact />} />
    </Switch>
  )
}

export default Router
