// Library
import React from 'react';

// Atoms
import {Icon} from "../../atoms";


interface ButtonIconProps extends React.HTMLAttributes<any>{
    position?: 'before' | 'after',
    onClick: () => void,
    iconName: string
    label?:string,
}

export const ButtonIcon: React.FC<ButtonIconProps> = (props)=>{
    const {iconName, label, onClick, position = 'before'} = props
    return <div className="btn" onClick={onClick}>
        {position === 'before' && <Icon name={iconName}/>}
        <span>{label}</span>
        {position === 'after' && <Icon name={iconName}/>}
    </div>
}

