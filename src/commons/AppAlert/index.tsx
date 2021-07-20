import React from 'react';
import { Classnames } from '../../helpers';
import './AppAlert.css';

interface IAppAlertProps {
    alertType?: "warning"|"error"|"info"|"success",
    title?: string,
    content?: string,
    [x:string]:any,
}

function AppAlert({alertType, title, content, className, ...restProps } : IAppAlertProps)  {

    var classes: string = Classnames('app-alert',{
        [`app-alert-${alertType}`]:!!alertType,
        [className]: !!className
    });

    if (!content) return <></>;

    return (
        <p className={classes}>
            {title && <strong>{title}</strong>}
            {content}
        </p>
    )


}

export default AppAlert;