import React from 'react'

interface IProps {
  text?: string
  size?: number
}

export const Spinner = ({ text, size = 32 }: IProps) => {
  return (
    <div className="spinner__container">
      <div className="spinner__loader" style={{ width: size, height: size }}></div>
      {text?.length && <span className="spinner__text">{text}</span>}
    </div>
  )
}

export default Spinner
