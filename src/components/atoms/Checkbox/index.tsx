import React from 'react';

interface CheckboxProps extends React.HTMLAttributes<any>{
    className?:string
}

export const Checkbox: React.FC<CheckboxProps> =(props)=>{
    return (
        <input {...props} type="checkbox" />
    )
}