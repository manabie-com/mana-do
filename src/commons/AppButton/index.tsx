import React from 'react';
import './AppButton.css';
import { Classnames } from '../../helpers';
import Loading from '../Loading';


type btnType = "primary" | 'default' | 'danger' | "link";

interface IAppButtonProps {
    btnType?: btnType,
    isLoading?: boolean,
    children?: any,
    [x:string]:any,
}

function AppButton({ btnType, children, isLoading, className, ...restProps } : IAppButtonProps){

    var classes: string = Classnames('btn',{
        'btn-primary': btnType==='primary',
        'btn-danger': btnType==='danger',
        'btn-link': btnType==="link",
        [className]: !!className
    })

    if (btnType==='link') {
      return  <a className={classes} {...restProps}>{children}</a>
  }



    const jsxContent = (
      <>
      <span>
        {isLoading && <Loading /> }
        
      </span>
      {children}
      </>
    )

    return <button className={classes} {...restProps}>{jsxContent}</button>; 
}

export default AppButton;

