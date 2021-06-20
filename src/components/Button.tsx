import React, {ComponentProps} from 'react';

type ButtonProps = ComponentProps<any> & {
    text: string;
    icon?: React.ReactElement
}


export const Button = (props: ButtonProps) => {
    const {text, icon, ...rest} = props;
    return <button {...rest}>{icon}{text}</button>
}