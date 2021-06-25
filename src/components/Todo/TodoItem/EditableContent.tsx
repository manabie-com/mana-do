import React, { useEffect, useRef } from 'react'

import Input from 'src/components/Input'
import { Todo } from 'src/models/todo'

import './EditableContent.css'

interface IProps {
  todo: Todo
  onUpdate: (content: string) => void
  onCancel: () => void
}

const EditableContent: React.FC<IProps> = ({ todo, onUpdate, onCancel }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus()
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUpdate()
    }
  }

  const handleUpdate = () => {
    if (inputRef.current?.value) {
      onUpdate(inputRef.current.value)
    }
  }

  return (
    <div className='Todo__content Todo__content--editable'>
      <Input
        ref={inputRef}
        defaultValue={todo.content}
        className='Todo__content-input'
        onKeyDown={handleKeyDown}
        onBlur={onCancel}
      />
    </div>
  )
}

export default EditableContent
