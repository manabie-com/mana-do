// Library
import React, {InputHTMLAttributes} from 'react';


interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    className?: string,
    ref?:any
}

export const Input: React.FC<InputProps> = (props) => {
    // Props
    return (
        <input {...props}/>
    )
}