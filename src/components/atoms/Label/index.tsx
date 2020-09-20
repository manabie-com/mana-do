import React, { ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
}

const Label =({ className, children }:Props) => {
  return (  
    <label className={className}>
      {children}
    </label>
  )
}

export default Label;