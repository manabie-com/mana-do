
import React from "react";
import { Classnames } from "../../helpers";
import { COPYRIGHT_TEXT } from "../constants";
import './AppFooter.css'


type textColor = 'white'|'black'|'theme';

interface IAppFooter {
    textColor?: textColor
    [x:string]:any
}

function AppFooter({ textColor, className, ...restProps } : IAppFooter ) {
    var classes: string = Classnames('app-footer',{
        [`app-footer-text-${textColor}`]: !!textColor,
        [className]: !!className
    })

    return (
        <p className={classes}>{COPYRIGHT_TEXT}</p>
    )
}

export default AppFooter;