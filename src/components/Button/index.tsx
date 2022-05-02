import React from 'react'

const Button = (props: any) => {
    const { className, title, onClick } = props

    return (
        <button className={`${className} `} onClick={onClick}>
            {title}
        </button>
    )
}

export default Button