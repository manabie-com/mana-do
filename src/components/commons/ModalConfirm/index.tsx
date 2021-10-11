import React, { forwardRef } from "react";
import { Button, ButtonColors } from "..";
import Modal from "../Modal/index";
import "./style.css";

interface Props {
  title?: string;
  content?: string;
  show?: boolean;
  txtSubmit?: string;
  txtCancel?: string;
  onConfirm?: () => void;
  onClose?: () => void;
}

const defaultProps: Props = {
  title: "Are you sure delete ?",
  content: "Item will be permanently deleted?",
  show: false,
  txtSubmit: "Yes",
  txtCancel: "No",
  onConfirm: () => null,
  onClose: () => null,
};

const ModalConfirm = forwardRef((props: Props, ref: any) => {
  const { onConfirm, onClose, show, title, content, txtSubmit, txtCancel } = {
    ...defaultProps,
    ...props,
  };
  return (
    <Modal ref={ref} width="30%" onClose={onClose} show={show} title={title}>
      <div className="content-modal-confirm">{content}</div>

      <div className="action-modal-confirm">
        <Button
          className="mr10"
          color={ButtonColors.danger}
          onClick={onConfirm}
        >
          {txtSubmit}
        </Button>
        <Button onClick={onClose}>{txtCancel}</Button>
      </div>
    </Modal>
  );
});
export default ModalConfirm;
