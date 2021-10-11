import React, { forwardRef } from "react";
import cn from "classnames";
import "./style.css";

interface Props {
  show?: boolean;
  width?: string;
  children?: React.ReactNode;
  title?: string;
  onClose?: () => void;
  className?: string;
}

const defaultProps: Props = {
  show: false,
  width: "30%",
  onClose: () => null,
};

const Modal = forwardRef((props: Props, ref: any) => {
  const { onClose, title, width, show, className, children, ...rest } = {
    ...defaultProps,
    ...props,
  };
  const showHideClassName = show
    ? "modal-custom display-block"
    : "modal-custom display-none";
  return (
    <div className={cn(showHideClassName, className)} {...rest}>
      <section style={{ width: width }} className="modal-main">
        <div className="header-modal mb40">
          <span className="title">{title}</span>
          <span className="icon-close" onClick={onClose}>
            <img width="30" src="images/cancel.png" alt="icon-close" />
          </span>
        </div>
        <div className="content-modal mt30">{children}</div>
      </section>
    </div>
  );
});

export default Modal;
