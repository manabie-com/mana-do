import React, { useState } from "react";

interface EditableContentProps {
    content: string;
    onChange: (content: string) => void;
}

export function EditableContent({ content, onChange }: EditableContentProps) {
    const [value, setValue] = useState(content);
    const [editing, setEditing] = useState(false);

    const onChangeHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const newContent = value.trim();
            // prevent update content to empty
            if (newContent) {
                onChange(value);
            } else {
                setValue(content);
            }
            setEditing(false);
        }
    }

    return (
        editing ?
            <input className="Todo__input" // className should be dynamic so this component is completely reusable
                type="text"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onKeyUp={onChangeHandler}
                onBlur={() => { setEditing(false); setValue(content); }}
            /> :
            <span onDoubleClick={() => setEditing(editing ? false : true)}>{content}</span>
    );
}