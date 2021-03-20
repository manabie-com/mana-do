import * as React from "react";

import styles from "./ManaDoModal.module.css";
import { IFormGroupProps } from "../FormGroup";

import { ReactComponent as Close } from "../../svgs/close.svg";
import { ReactComponent as HeadSVG } from "../../svgs/head.svg";
import FormGroup from "../FormGroup";
import ManaDoButton from "../ManaDoButton";

export interface ManaDoModalProps extends React.HTMLAttributes<HTMLElement> {
  show: boolean;
  onClickOutside: React.MouseEventHandler;
  onClose: Function;
  onConfirm: Function;
  fields: IFormGroupProps[];
  isLoading?: boolean;
}

// This modal can render forms with fields: IFormGroupProps[] prop
const ManaDoModal: React.FunctionComponent<ManaDoModalProps> = ({
  show,
  onClickOutside,
  onClose,
  onConfirm,
  fields,
  isLoading = false,
}) => {
  const [formData, setFormData] = React.useState({});

  const handleCloseModal = React.useCallback(
    (e) => {
      e.preventDefault();
      onClose();
    },
    [onClose]
  );

  const handleChangeFormData = React.useCallback((e) => {
    const { currentTarget } = e;
    setFormData((prev) => ({
      ...prev,
      id: currentTarget.id,
      [currentTarget.name]: currentTarget.value,
    }));
  }, []);

  const handleSubmitFormModal = React.useCallback(
    (e) => {
      e.preventDefault();
      onConfirm(formData);
    },
    [formData, onConfirm]
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
          <form
            className={`${styles.ManaDo__UpdateTodoForm} mt-1`}
            onSubmit={handleSubmitFormModal}
          >
            {(fields.length &&
              fields.map((field, idx) => (
                <FormGroup
                  key={idx}
                  className={`${styles.ManaDo__UpdateTodoInput}`}
                  {...field}
                  onChange={handleChangeFormData}
                />
              ))) ||
              ""}
            <div className={`${styles.ManaDo__UpdateTodoButtons} mt-3`}>
              <ManaDoButton
                isLoading={isLoading}
                type="submit"
                label="Confirm"
                className="mr-1"
                variant="secondary-light"
              />
              <ManaDoButton
                type="button"
                label="Cancel"
                variant="muted"
                onClick={handleCloseModal}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default React.memo(ManaDoModal);
