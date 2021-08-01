/*
    This is a Modal component that is used to open Edit Item modal.
*/

import React from 'react';
import './Modal.scss';

interface ModalProps {
    children: JSX.Element | JSX.Element[],
    closeModal?: React.MouseEventHandler<HTMLDivElement> | undefined
}

const Modal = ({ children, closeModal }: ModalProps) => {
    return (
        <div className="Modal">
            <div className="Modal__Backdrop" onClick={closeModal}></div>
            <div className="Modal__Content">
                {children}
            </div>
        </div>
    )
}

export default Modal
