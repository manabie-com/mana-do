import React from "react";
import { Classnames } from '../../helpers';
import './AppText.css';


interface IAppText {
    strong?: any,
    italic?:any,
    strikethrough?:boolean,
    underline?:any,
    children?: React.ReactNode,
    [x:string]:any,
}

function AppText ( { strong, italic, strikethrough, underline, className, children, ...restProps } : IAppText ) {

    var classes: string = Classnames('app-text',{
        'app-text-strong': !!strong,
        'app-text-italic': !!italic,
        'app-text-strikethrough': !!strikethrough,
        'app-text-underline': !!underline,
        [className]: !!className
    })

    var jsxContent = <span className={classes} {...restProps}>{children}</span>;
    
    
    return jsxContent;

}

export default AppText;