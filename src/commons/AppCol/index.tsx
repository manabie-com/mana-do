import React, { ReactNode } from 'react';
import { Classnames } from '../../helpers'

interface IAppColProps {
    children: ReactNode,
    xs?: number,
    sm?: number,
    md?: number,
    lg?: number,
    xl?: number,
    [x:string]:any
}

export default function AppCol({ children, className, sm, md, xs,lg,xl, ...restProps } : IAppColProps) {
    const classes: string = Classnames(className,{
      [`app-col-xs-${xs}`]: xs?(xs<= 12 && xs >= 1):false,
      [`app-col-sm-${sm}`]: sm?(sm<= 12 && sm >= 1):false,
      [`app-col-md-${md}`]: md?(md <= 12 && md >= 1):false,
      [`app-col-lg-${lg}`]: lg?(lg <= 12 && lg >= 1):false,
      [`app-col-xl-${xl}`]: xl?(xl <= 12 && xl >= 1):false,
      [className]:!!className
    });

  return (
    <div className={classes} {...restProps}>{children}</div>
  )
}