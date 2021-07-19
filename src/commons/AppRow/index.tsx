import React from 'react';
import { Classnames } from '../../helpers'

interface IAppRowProps {
    [x:string]:any
}

export default function AppRow({ children, className, ...restProps } : IAppRowProps) {
    const classes: string = Classnames('app-row',{
        [className]: className
    });

  return (
    <div className={classes}>{children}</div>
  )
}