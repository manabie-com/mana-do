import React from 'react';
import { Classnames } from '../../helpers';
import './InputText.css';
// import { Classnames } from '../../helpers';


interface IAppInputProps {
    placeholder?: string
    errorText?: string
    label?: string
    [x: string]: any
}

const AppInput = React.forwardRef(({ placeholder, className, errorText, required, label, ...restProps }: IAppInputProps, ref: React.Ref<HTMLInputElement>) => {
    var classes: string = Classnames('app-input', {
        'input-has-error': !!errorText,
        [className]: !!className
    })
    return <>
        <label className={Classnames('app-input-label', { 'required': !!required })}>
            {label}
        </label>
        <input
            ref={ref}
            type="text"
            className={classes}
            placeholder={placeholder || "Please type something"}
            {...restProps}></input>
        {
            !!errorText && <div><span className='app-input-error-text'>{errorText}</span></div>
        }
    </>
});

export default AppInput;

