import React, { Fragment } from 'react';

import "./styles.css"

type Props = {
  onToggle: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onOk: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}

const Modal =({ onToggle, isOpen, title, children, onOk}: Props) => {
  return (  
    <Fragment>
        <div className="Modal" style={{ display: isOpen ? 'block' : "none" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                 <h5 className="modal-title">{title}</h5>
                <span onClick={onToggle} className="Modal__close-icon">&times;</span>
              </div>
              <div className="modal-body">
              {children}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onToggle}>Close</button>
                <button type="button" className="btn btn-primary" onClick={onOk}>Ok</button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
  )
}

export default Modal;