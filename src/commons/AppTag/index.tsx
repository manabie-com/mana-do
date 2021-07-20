import React from "react";
import { Classnames } from '../../helpers';
import './AppTag.css';

type color = "success" | "info" | "danger" | "warning";

interface IAppTag {
    color?: color,
    children?: React.ReactNode
    [x:string]:any,
}

function AppTag ( { color, children, className } : IAppTag ) {

    var classes: string = Classnames('tag',{
        'tag-success': color==='success',
        'tag-info': color==='info',
        'tag-danger': color==='danger',
        'tag-warning': color==='warning',
        [className]: !!className
    })

    var jsxContent = <span className={classes}>{children}</span>;
    
    
    return jsxContent;

}

export default AppTag;