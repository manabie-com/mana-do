import React, {ComponentProps} from 'react';

type ButtonProps = ComponentProps<any> & {
    text: string;
}


export const Button = (props: ButtonProps) => {
    const {text, ...rest} = props;
    return <button {...rest}>{text}</button>
}