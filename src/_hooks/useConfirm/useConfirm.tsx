import React from "react";

import { ConfirmModalProps } from "./ConfirmModal";
import {
  closeModal,
  ConfirmContext,
  setConfirmModalState,
  setLoading,
} from "../../store/contexts/confirmContext";

const useConfirm = () => {
  const [, dispatch] = React.useContext(ConfirmContext);

  const setConfirmConfig = (data: ConfirmModalProps) => {
    dispatch(setConfirmModalState(data));
  };

  const closeConfirmModal = () => {
    dispatch(closeModal());
  };

  const setLoadingState = (flg: boolean) => {
    dispatch(setLoading(flg));
  };

  return { setConfirmConfig, closeConfirmModal, setLoadingState };
};

export default useConfirm;
