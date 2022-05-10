// Library
import React from 'react';
import {Icon} from "../Icon";
import {Span} from "../Span";

interface ItemSiderBarProps {
    iconName:string,
    label: string,
    onClick?: () => void,
    isMenuAcive: boolean
}

export const ItemSiderBar:React.FC<ItemSiderBarProps> = (props) => {
    const {iconName, label, onClick, isMenuAcive} = props
    return (
        <div className="WrapperItemSiderBar" onClick={onClick}>
            <div className={`${isMenuAcive && 'ItemSiderBar--acitve'} ItemSiderBar`}>
                <Icon name={iconName}/>
                <Span>{label}</Span>
            </div>
        </div>
    )
}