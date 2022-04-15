import React from 'react'

interface IProps {
  label?: string
  type: string
  onButtonClick: Function
  showing: string
}

export const TabButton = ({ label, type, showing, onButtonClick }: IProps) => {
  const activeClass = showing === type ? 'is-active' : ''
  return (
    <button className={`Action__btn ${activeClass}`} onClick={() => onButtonClick(type)}>
      {label}
    </button>
  )
}

export default TabButton
