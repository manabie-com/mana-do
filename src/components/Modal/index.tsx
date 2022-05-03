import React from "react";
import "./Modal.css";

interface backdrop {
    closeModalHandler: () => void;
}

interface overLay {
    children: any;
}

interface modal {
    children: any;
    closeModalHandler: () => void;
}


const Backdrop = (props: backdrop) => {
    return <div onClick={props.closeModalHandler} className="backdrop" />;
};
const ModalOverlay = (props: overLay) => {
    return <div className="modaling">{props?.children}</div>;
};

const Modal = (props: modal) => {
    return (
        <>
            <Backdrop closeModalHandler={props?.closeModalHandler} />
            <ModalOverlay>{props?.children}</ModalOverlay>
        </>
    );
};

export default Modal;