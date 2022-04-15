import React from 'react'
import { EnhanceTodoStatus } from '../../types/todo'

interface IProps {
  label?: string
  type: string
  onButtonClick: (type: EnhanceTodoStatus) => void
  showing: string
}

export const TabButton = ({ label, type, showing, onButtonClick }: IProps) => {
  const activeClass = showing === type ? 'is-active' : ''
  return (
    <button
      className={`Action__btn ${activeClass}`}
      onClick={() => onButtonClick(type as EnhanceTodoStatus)}
    >
      {label}
    </button>
  )
}

export default TabButton
