import * as React from 'react'
import { withRouter } from 'react-router-dom'

class Exception extends React.Component<any, any> {
  handleBack = () => {
    if (this.props.fromErrorBoundary) {
      window.location.reload();
    } else {
      this.props.history.push('/');
    }
  }

  public render() {
    return <div>
      <p className="mt-3">
        Look like something went wrong. Don't worry though, our best man is on the case.
        <b className="ml-1 pointer" onClick={this.handleBack}>Go back</b>
      </p>
    </div>
  }
}

export default withRouter(Exception)
