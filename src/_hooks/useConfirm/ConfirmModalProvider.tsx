import React from "react";
import ConfirmModal from "./ConfirmModal";
import {
  closeModal,
  ConfirmContext,
} from "../../store/contexts/confirmContext";

interface ConfirmProviderProps extends React.HTMLAttributes<HTMLElement> {}

const ConfirmProvider: React.FunctionComponent<ConfirmProviderProps> = ({
  children,
}) => {
  const [{ isShow, config }, dispatch] = React.useContext(ConfirmContext);

  return (
    <>
      <ConfirmModal
        {...config}
        show={isShow}
        onClose={() => dispatch(closeModal())}
        onClickOutside={() => dispatch(closeModal())}
      />
      {children}
    </>
  );
};

export default ConfirmProvider;
