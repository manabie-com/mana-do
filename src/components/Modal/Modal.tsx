import React from "react";
import "./styles.css";
import clsx from "clsx";

export interface PropsModal {
  isActive: boolean;
  handleModal: Function;
}

const Modal = ({ isActive, handleModal }: PropsModal) => {
  const onClose = () => {
    handleModal("close");
  };

  const onDelete = () => {
    handleModal("delete");
  };

  return (
    <>
      <div className={clsx("Modal", isActive && "Modal--active")}>
        <div className="Modal__content ">
          <p>Are you sure delete all ?</p>
          <button onClick={onDelete} className="Modal__btn--delete">
            Delete All
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
};

export default Modal;
