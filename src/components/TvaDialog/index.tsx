import * as React from 'react';
import 'style.css';

export interface ITvaDialogProps {
  title?: string;
  children: JSX.Element;
}

export function TvaDialog (props: ITvaDialogProps) {
  const { title, children } = props;
  return (
    <div className="tva-dialog-background">
      <div className="tva-dialog">
        <React.Fragment>
          { title ? <h1>{title}</h1>: <></> }
        </React.Fragment>
        <React.Fragment>
          {children}
        </React.Fragment>
      </div>
    </div>
  );
}
