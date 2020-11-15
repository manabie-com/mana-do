import React from 'react'

import './styles.css'

interface Props {
  type: 'info' | 'alert' | 'error',
  children: React.ReactNode
}

export default ({ type, children }: Props) => {
  return (
    <div className={`notification-${type}`}>
      {children}
    </div>
  )
}
