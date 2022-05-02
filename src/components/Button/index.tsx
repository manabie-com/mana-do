import React from 'react'

const Button = (props: any) => {
    const { className, title, onClick } = props

    const handleClick = () => {
        onClick()
    }

    return (
        <button className={`${className} `} onClick={handleClick}>
            {title}
        </button>
    )
}

export default Button