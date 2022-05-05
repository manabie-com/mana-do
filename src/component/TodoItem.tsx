/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo } from 'react'
import Close from './Icon/Close'

const TodoItem = (props: { data: any }) => {
  const { data } = props
  return (
    <div className={`ToDo__item`}>
      <input type="checkbox" />

      <span>{data.content}</span>
      <button className="Todo__delete">
        <Close />
      </button>
    </div>
  )
}

export default memo(TodoItem)
