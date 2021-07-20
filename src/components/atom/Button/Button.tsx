import React from 'react';
import './button.scss'

export enum ButtonType {
    SUBMIT = "submit",
    BUTTON = "button",
    RESET = "reset",
}
type Button = ButtonType | undefined

interface IButton {
    label: string,
    className: string,
    type?: Button,
    style?: any,
    onClick?: (e: any) => void
    onBlur?: (e: any) => void
}
const Button = ({ onBlur, onClick, label, className, type, style }: IButton) => {
    const handleOnClick = (e: any) => {
        if (onClick) {
            onClick(e)
        }
    }
    const handleOnBlur = (e: any) => {
        if (onBlur) {
            onBlur(e)
        }
    }

    return (
        <button
            data-testid={className}
            style={style}
            className={`button ${className}`}
            type={type}
            onClick={handleOnClick}
            onBlur={handleOnBlur}
        >
            {label}
        </button >
    )
}
export default Button;
