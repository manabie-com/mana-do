import React from 'react';
import './formInput.scss'

interface IFormInput {
    checked?: boolean,
    readOnly?: boolean,
    name?: string,
    className?: string,
    label?: string,
    type?: string,
    value?: string,
    style?: any,
    inputRef?: React.RefObject<HTMLInputElement>,
    placeholder?: string,
    onChange?: (e: any) => void,
    onKeyDown?: (e: any) => void,
    onBlur?: (e: any) => void,
    onDbClick?: (e: any) => void,
}

const FormInput = ({
    label,
    name,
    className,
    readOnly,
    type = '',
    value,
    inputRef,
    style,
    placeholder,
    checked,
    onChange,
    onKeyDown,
    onBlur,
    onDbClick
}: IFormInput) => {

    const handleOnBlur = (e: any) => {
        if (onBlur) {
            onBlur(e)
        }
    }
    const handleOnChange = (e: any) => {
        if (onChange) {
            onChange(e)
        }
    }
    const handleOnDbClick = (e: any) => {
        if (onDbClick) {
            onDbClick(e)
        }
    }
    const handleOnKeyDown = (e: any) => {
        if (onKeyDown) {
            onKeyDown(e)
        }
    }
    return (
        <div className={`${className} form-input `} >
            {label && <div className='label' style={{ marginRight: '1rem' }}>{label}</div>}
            <input
                name={name}
                checked={checked}
                style={style}
                readOnly={readOnly}
                ref={inputRef}
                placeholder={placeholder}
                className={`${className} input`}
                data-testid={className}
                value={value}
                onChange={handleOnChange}
                type={type}
                onBlur={handleOnBlur}
                onKeyDown={handleOnKeyDown}
                onDoubleClick={handleOnDbClick}
            />
        </div>
    )
}

export default FormInput