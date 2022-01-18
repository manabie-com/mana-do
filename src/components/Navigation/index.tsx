import React from 'react'

import { useHistory } from 'react-router-dom'

import Service from '../../service'

const Navigation = () => {
  
  const history = useHistory()

  const handleLogout = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    await Service.logout()
    history.push('/login')
  }

  return (
    <div className="Navigation__container">
      <a href="/logout" onClick={handleLogout}>Logout</a>
    </div>
  )
}

export {Navigation}