import * as React from "react";

import styles from "./ConfirmModal.module.css";
import { ReactComponent as Close } from "../../../svgs/close.svg";
import ManaDoButton from "../../../components/ManaDoButton";

// This component is from hooks component, should not be resused
export interface ConfirmModalProps extends React.HTMLAttributes<HTMLElement> {
  show?: boolean;
  onConfirm: Function;
  title: string;
  subLabel: string;
  content: React.ReactNode;
  isLoading?: boolean;
  primaryLabel?: string;
  primaryVariant?:
    | "primary"
    | "secondary"
    | "danger"
    | "primary-light"
    | "secondary-light"
    | "danger-light"
    | "muted";
  secondaryLabel?: string;
  variant?: "primary" | "danger";
  onClickOutside?: React.MouseEventHandler;
  onClose?: Function;
}

const ConfirmModal: React.FunctionComponent<ConfirmModalProps> = ({
  show = false,
  onConfirm,
  title,
  subLabel,
  content,
  isLoading = false,
  primaryLabel = "Confirm",
  primaryVariant = "primary",
  secondaryLabel = "Cancel",
  variant = "primary",
  onClickOutside = () => {},
  onClose = () => {},
}) => {
  const modalVariant = React.useMemo(() => {
    switch (variant) {
      case "danger":
        return styles.ModalDanger;

      default:
        return styles.ModalPrimary;
    }
  }, [variant]);

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
          (show && styles.show) || styles.hidden
        }`}
        onClick={onClickOutside}
      ></div>
      <div
        className={`${styles.ManaDo__ModalContainer} ${
          (show && styles.show) || styles.hidden
        } ${modalVariant}`}
      >
        <button
          onClick={handleCloseModal}
          className={styles.ManaDo__CloseWrapper}
        >
          <Close className={styles.ManaDo__CloseIcon} />
        </button>
        <div className={styles.ManaDo__ModalContentContainer}>
          <div className={styles.ManaDo__LabelWrapper}>
            <h3 className={styles.ManaDo__HeaderLabel}>{title}</h3>
            <span className={styles.ManaDo__HeaderSublabel}>{subLabel}</span>
          </div>
          <div className={styles.ManaDo__Content}>{content}</div>
          <div className={styles.ManaDo__ButtonWrapper}>
            <ManaDoButton label={secondaryLabel} onClick={handleCloseModal} />
            <ManaDoButton
              className={styles.ManaDo__PrimaryButton}
              label={primaryLabel}
              variant={primaryVariant}
              onClick={() => onConfirm()}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ConfirmModal);
