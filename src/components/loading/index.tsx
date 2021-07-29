import React from 'react'

export type ILoadingProps = {
}

const Loading = (props: ILoadingProps) => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      display: 'flex',
      alignContent: 'center'
    }}>Loading...</div>
  )
}

export default Loading