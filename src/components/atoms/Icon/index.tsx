// Library
import React from 'react';

interface IconProps {
    name: string,
}

export const Icon: React.FC<IconProps> = (props) => {
    const {name} = props;
    return <i className={`manabie-${name}`}></i>
}