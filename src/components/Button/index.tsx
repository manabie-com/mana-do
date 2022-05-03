import React from 'react'
import './Button.css'

const Button = (props: any) => {
    const { className, title, onClick, disabled, active } = props

    return (
        <button className={`${className} ${active && "btn__active"} `} onClick={onClick} disabled={disabled} type="button">
            {title}
        </button>
    )
}

export default Button