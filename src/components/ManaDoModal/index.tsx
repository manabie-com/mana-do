import * as React from "react";
import styles from "./ManaDoModal.module.css";
import { ReactComponent as Close } from "../../svgs/close.svg";
import { ReactComponent as HeadSVG } from "../../svgs/head.svg";
import FormGroup from "../FormGroup";
import ManaDoButton from "../ManaDoButton";
import { IFormGroupProps } from "../FormGroup";

export interface ManaDoModalProps extends React.HTMLAttributes<HTMLElement> {
  show: boolean;
  onClickOutside: React.MouseEventHandler;
  onClose: Function;
  onConfirm: Function;
  fields: IFormGroupProps[];
}

const ManaDoModal: React.FunctionComponent<ManaDoModalProps> = ({
  show,
  onClickOutside,
  onClose,
  onConfirm,
  fields,
  ...props
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

  return (
    <>
      <div
        className={`${styles.ManaDo__OverlayBackground} ${
          (!show && styles.hidden) || styles.show
        }`}
        onClick={onClickOutside}
      ></div>
      <div
        className={`${styles.ManaDo__ModalContainer} ${
          (!show && styles.hidden) || styles.show
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
            onSubmit={(e) => {
              e.preventDefault();
              onConfirm(formData);
            }}
          >
            {fields.length &&
              fields.map((field) => (
                <FormGroup
                  className={`${styles.ManaDo__UpdateTodoInput}`}
                  {...field}
                  onChange={handleChangeFormData}
                />
              ))}
            <div className={`${styles.ManaDo__UpdateTodoButtons} mt-3`}>
              <ManaDoButton
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
