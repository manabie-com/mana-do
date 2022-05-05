/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useRef, useState } from 'react'
import { TodoStatus } from '../models/todo'
import { debounce } from '../utils'
import Close from './Icon/Close'

const TodoItem = (props: {
  data: any
  onUpdateData: (data: object, values: object) => any
  onRemoveItem: (id: string) => any
}) => {
  const [isEdit, setIsEdit] = useState(false)
  const inputRef = useRef<any>(null)
  const { data, onUpdateData, onRemoveItem } = props

  const getNewStatus = (value: string) => {
    return value === TodoStatus.ACTIVE
      ? TodoStatus.COMPLETED
      : TodoStatus.ACTIVE
  }

  const debouncedSearch = debounce(async action => {
    switch (action) {
      case 1:
        !isEdit && onUpdateData(data, { status: getNewStatus(data.status) })
        break
      case 2:
        setIsEdit(true)
        inputRef.current.value = data.content
        inputRef.current.focus()
        break
      default:
        break
    }
  }, 200)

  const handleClick = useCallback(
    (e: any) => {
      !isEdit && debouncedSearch(e.detail)
    },
    [isEdit]
  )

  //HANDLE UPDATE CONTENT
  const handleUpdateContentBlur = () => {
    setIsEdit(false)
    onUpdateData(data, { content: inputRef.current.value })
  }

  const handleUpdateContentKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      setIsEdit(false)
      onUpdateData(data, { content: inputRef.current.value })
    }
  }

  const handleRemoveItem = () => {
    onRemoveItem(data.id)
  }

  return (
    <div className={`ToDo__item ${isEdit && 'ToDo__item--active'}`}>
      <input
        type="checkbox"
        checked={TodoStatus.COMPLETED === data.status}
        onChange={() =>
          onUpdateData(data, { status: getNewStatus(data.status) })
        }
      />
      {isEdit ? (
        <input
          ref={inputRef}
          className="ToDo__item--input"
          onBlur={handleUpdateContentBlur}
          onKeyDown={handleUpdateContentKeyDown}
        />
      ) : (
        <span onClick={handleClick}>{data.content}</span>
      )}
      <button className="Todo__delete" onClick={handleRemoveItem}>
        <Close />
      </button>
    </div>
  )
}

export default memo(TodoItem)
