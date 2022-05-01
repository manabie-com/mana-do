import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const ButtonModal = ({ action, message, buttonText, className }: any) => {

    const [showModal, setShowModal] = useState(false);
    const toggle = () => setShowModal(!showModal);

    return (
        <>
            <button className={className} onClick={toggle}>{buttonText}</button>
            <Modal isOpen={showModal} toggle={toggle}>
                <ModalHeader>
                    <h4>Warning</h4>
                </ModalHeader>
                <ModalBody>
                    {message}
                </ModalBody>
                <ModalFooter>
                    <button className="Action__btn" onClick={() => action()}>
                        OK
                    </button>
                    <button onClick={toggle}>Cancel</button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ButtonModal;