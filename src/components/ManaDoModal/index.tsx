import * as React from "react";
import styles from "./ManaDoModal.module.css";
import { ReactComponent as Close } from "../../svgs/close.svg";
import { ReactComponent as HeadSVG } from "../../svgs/head.svg";
import FormGroup from "../FormGroup";
import ManaDoButton from "../ManaDoButton";

export interface ManaDoModalProps extends React.HTMLAttributes<HTMLElement> {
  show: boolean;
  onClickOutside: React.MouseEventHandler;
  onClose: Function;
}

const ManaDoModal: React.FunctionComponent<ManaDoModalProps> = ({
  show,
  onClickOutside,
  onClose,
  ...props
}) => {
  const handleCloseModal = React.useCallback(
    (e) => {
      e.preventDefault();
      onClose();
    },
    [onClose]
  );

  return (
    <>
      <div
        className={`${styles.ManaDo__OverlayBackground} ${
          (!show && styles.hidden) || ""
        }`}
        onClick={onClickOutside}
      ></div>
      <div
        className={`${styles.ManaDo__ModalContainer} ${
          (!show && styles.hidden) || ""
        }`}
      >
        <HeadSVG className={styles.ManaDo__HeadSVG} />
        <button
          onClick={handleCloseModal}
          className={styles.ManaDo__CloseWrapper}
        >
          <Close className={styles.ManaDo__CloseIcon} />
        </button>
        <div className={styles.ManaDo__ModalContentContainer}>
          <div className={styles.ManaDo__LabelWrapper}>
            <h3 className={styles.ManaDo__HeaderLabel}>Edit todo</h3>
            <span className={styles.ManaDo__HeaderSublabel}>
              Change your content
            </span>
          </div>
          <form className={`${styles.ManaDo__UpdateTodoForm} mt-2`}>
            <FormGroup
              className={`${styles.ManaDo__UpdateTodoInput}`}
              id="content-update"
              name="contentUpdate"
              type="text"
              value=""
              placeholder="How do you want to change?"
            />
            <div className={`${styles.ManaDo__UpdateTodoButtons} mt-3`}>
              <ManaDoButton label="Confirm" className="mr-1" />
              <ManaDoButton label="Cancel" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default React.memo(ManaDoModal);
