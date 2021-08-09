import React, { Component } from 'react'
import Exception from '../ExceptionScreen'

interface LoadingSplashScreenProps {
  goNext?: () => void
  destroyTime?: number
  loaderType?: string
  loaderMessage?: string
}
const LoadingSplashScreen: React.FC<LoadingSplashScreenProps> = ({}) => {

  return (
    <div id="splash-screen" className="app-splash-screen">
        <div id="splash-default">
          <div className="wrap-loading">
            Wait a moment while we load your app.
            <div className="loading-dot">.</div>
          </div>
        </div>
    </div>
  )
}

function withSplashScreen(WrappedComponent: any) {
  return class extends Component {
    state = {
      loading: true,
      loaderType: '',
      loaderMessage: '',
      error: null
    }
    constructor(props: any) {
      super(props)
    }

    destroyDelayTime = () => {
      this.setState({ loading: false })
    }

    render() {
      // while checking user session, show "loading" message
      let { loaderType, loaderMessage } = this.state

      if (this.state.loading) {
        return (
          <LoadingSplashScreen
            goNext={this.destroyDelayTime}
            loaderType={loaderType}
            loaderMessage={loaderMessage}
          />
        )
      }

      if (this.state.error) {
        return <Exception type="404" />
      }

      // otherwise, show the desired route
      return <WrappedComponent {...this.props} />
    }
  }
}

export default withSplashScreen
