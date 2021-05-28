import React, { memo, useState } from 'react'

interface InlineEditableProps {
    todoName: string
    onChange: (content: string) => void
}

const InlineEditable = (props: InlineEditableProps) => {
    const { todoName, onChange } = props
    const [isEditable, setEditable] = useState(false)
    const inputRef = React.createRef<HTMLInputElement>()

    const onDoubleClick = () => {
        setEditable(true)
    }

    const onUpdateContent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current) {
            if (!inputRef.current.value.trim()) {
                inputRef.current.value = todoName
                setEditable(false)
                return
            }

            onChange(inputRef.current.value)
            setEditable(false)
        }
    }
    const onCancelUpdatingContent = () => {
        setEditable(false)
        inputRef.current && (inputRef.current.value = todoName)
    }

    return (
        <input
            ref={inputRef}
            name="Todo__content"
            readOnly={!isEditable}
            defaultValue={todoName}
            onDoubleClick={onDoubleClick}
            onKeyPress={onUpdateContent}
            onBlur={onCancelUpdatingContent}
            className={`Todo__input Todo__content ${isEditable && 'Todo__content--editable'}`}
        >
        </input>
    )
}

export default memo(InlineEditable)
