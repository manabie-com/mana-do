import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import './style.css';

export interface ITvaDialogProps {
  title?: string;
  dialogStyle?: {
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    height?: string;
  }
  children?: any | any[];
  isShown: boolean;
  onCancel: () => void;
}

export function TvaDialog (props: ITvaDialogProps) {
  const { title, children, dialogStyle, onCancel } = props;
  const [isShown, setIsShown] = useState<boolean>(props.isShown);
  const onClose = useCallback((e?: any) => {
    if (e) e.stopPropagation();
    setIsShown(false);
    onCancel();
  }, [onCancel])
  const escape = useCallback((e: any) => {
    if (e.key === 'Escape') {
      onClose();
      document.removeEventListener('keydown', escape);
    }
  }, [onClose])
  useEffect(() => {
    setIsShown(props.isShown);
    document.addEventListener('keydown', escape)
  }, [props.isShown, escape]);
  return isShown ? (
      <div className="Tva__Dialog__Background" onClick={onClose}>
        <div className="Tva__Dialog" style={{ ...dialogStyle }} onClick={e => e.stopPropagation()}>
          <React.Fragment>
            { title ? <h1>{title}</h1>: <></> }
          </React.Fragment>
          <React.Fragment>
            {children}
          </React.Fragment>
        </div>
      </div>
  ): (<React.Fragment></React.Fragment>);
}
