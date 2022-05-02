import React from 'react';

interface checkboxProps {
    onChange: (e: any, index: number) => void;
    className?: string | undefined;
    checked?: boolean;
    index: number;
}

const Checkbox = (props: checkboxProps) => {
    const { className, onChange, checked, index } = props

    return (
        <input
            checked={checked}
            className={`${className} `}
            onChange={(e) => onChange(e, index)}
            type="checkbox"

        />
    )

}

export default Checkbox