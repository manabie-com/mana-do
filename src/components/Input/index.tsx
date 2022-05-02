import React from 'react';

interface inputProps {
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string | undefined;
    placeholder?: string;
    value?: string;
}

const Input = (props: inputProps) => {
    const { onKeyDown, className, placeholder, onChange, value } = props
    return (
        <input
            value={value}
            className={`${className} Action__btn`}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            onChange={onChange}
            type="text"
        />
    )
}

export default Input