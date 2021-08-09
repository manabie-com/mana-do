import * as React from 'react'
import { Switch } from 'react-router-dom'
import ProtectedRoute from '../../navigation/ProtectedRoute'
import { portalLayouts } from '../../navigation/router.config'

class PortalLayout extends React.Component<any> {
  render() {
    return <Switch>
      {Object.keys(portalLayouts).map((route: any, index: any) => {
        return (
          <ProtectedRoute
            key={index}
            path={portalLayouts[route].path}
            component={portalLayouts[route].component}
            permission={portalLayouts[route].permission}
          />
        )
      })}
    </Switch>
  }
}

export default PortalLayout
