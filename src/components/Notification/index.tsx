import React from 'react'

import './styles.css'

interface Props {
  type: 'info' | 'alert' | 'error',
  children: React.ReactNode
  className?: string
}

export default ({ type, children, className }: Props) => {
  let classes = `Notification Notification--${type}`
  if (className) {
    classes = classes + ` ${className}`
  }

  return (
    <div className={classes}>
      {children}
    </div>
  )
}
