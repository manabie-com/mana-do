import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

const css: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const NotFound: React.FC<RouteComponentProps> = () => (
  <div data-cy="not-found-page" style={css}>
    <h1>Page Not Found</h1>
  </div>
)

export default NotFound
