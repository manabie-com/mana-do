import React from "react";
import { Classnames } from "../../helpers";
import './AppCheckbox.css';

interface IAppCheckboxProps {
    checked?:any,
    [x:string]: string | any
}


const AppCheckbox = ({ checked, className, ...restProps } : IAppCheckboxProps) => {
    var classes: string = Classnames('app-checkbox',{
        [className]: !!className
    })
    return (
        <input {...restProps} checked={checked} className={classes} type="checkbox" />
    );
};

export default AppCheckbox;


