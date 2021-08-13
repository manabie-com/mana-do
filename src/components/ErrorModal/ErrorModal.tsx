import React from "react";
import "./ErrorModal.scss";
import { Modal } from "../Modal/Modal";
import { SvgError } from "../../assets";

export const ErrorModal: React.FC<IModalError> = ({ message, ...props }) => {
  return (
    <Modal {...props} className="error-modal">
      <SvgError />
      <span>{message}</span>
    </Modal>
  );
};
