import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { accountLayout } from '../../navigation/router.config'

class AccountLayout extends React.Component<any> {
  render() {
    return (
        <div className="container">
          <Switch>
            {Object.keys(accountLayout).map((pageName: any, index: number) => (
              <Route
                key={index}
                path={accountLayout[pageName].path}
                component={accountLayout[pageName].component}
                exact={accountLayout[pageName].exact}
              />
            ))}

            <Redirect from="/account" to="/account/login" />
          </Switch>
        </div>
    )
  }
}

export default AccountLayout
