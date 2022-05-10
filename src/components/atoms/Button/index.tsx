// Libraries
import React from 'react';
import {MAP_STYLE_COLOR} from "./constants";

interface TButtonProps extends React.HTMLAttributes<any> {
    className?: string
    color?: "primary" | "success" | "errors" | "warning"
}

export const Button: React.FC<TButtonProps> = (props) => {
    // props
    const {children, color="primary"} = props

    return (
        <button {...props} className={`${props.className || ''} btn ${MAP_STYLE_COLOR[color]}`}>
            {children}
        </button>
    );
};
