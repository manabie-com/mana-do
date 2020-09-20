import React, { ReactNode } from 'react';

import "./styles.css"

type Props = {
  children: ReactNode
}

const PublicTemplate = ({children}:Props)=>{
  return (
    <div className="container-fluid PublicTemplate">
      <div className="row">
        <div className="col-12">
          <div className="PublicTemplate__logo"></div>
        </div>
        <div className="col-12">
          <div className="PublicTemplate__content">
            {children}
          </div>
        </div>
        </div>
    </div>
   )
}

export default PublicTemplate;