import React from 'react'

interface ButtonInterface {
    attr: string
    className: string
    label: string
    onClick: () => void
}

const Button = ({ attr, label, onClick, className }: ButtonInterface) => {
    return (
        <button className={className} onClick={onClick}>
            {label}
        </button>
    )
}

export default Button