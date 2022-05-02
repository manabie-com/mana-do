import React from 'react';

interface checkboxProps {
    onChange: (e: any, todoId: string) => void;
    className?: string | undefined;
    checked?: boolean;
    todoId: string;
}

const Checkbox = (props: checkboxProps) => {
    const { className, onChange, checked, todoId } = props

    return (
        <input
            checked={checked}
            className={`${className} `}
            onChange={(e) => onChange(e, todoId)}
            type="checkbox"

        />
    )

}

export default Checkbox