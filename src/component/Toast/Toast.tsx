import React, { useEffect } from 'react';
import { ToastContainer, TypeOptions, ToastPosition, toast, ToastContent, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import i18n from '../../i18n/i18n';

type Props = {
  type?: TypeOptions;
  message: string;
  position?: ToastPosition;
  duration?: number | false;
  handleClose?: () => void;
};

interface TYPE_OPTIONS {
  [type: string]: TypeOptions;
}

export const DURATION = {
  TOAST: 5000,
  TOAST_TRANSITION: 3000
};

export const TOAST_TYPE: TYPE_OPTIONS = {
  SUCCESS: 'success',
  ERROR: 'error'
};

interface POSITION_OPTIONS {
  [pos: string]: ToastPosition;
}
export const POSITION: POSITION_OPTIONS = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  TOP_CENTER: 'top-center',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_CENTER: 'bottom-center'
};
const Toast: React.FC<Props> = (props) => {
  // props
  const { type, duration, message, handleClose } = props;
  const position = props.position || POSITION.TOP_CENTER;

  const content: ToastContent = getContentToast(message, type);

  // states

  // on change type
  useEffect(() => {
    switch (type) {
      case TOAST_TYPE.ERROR:
        toast.error(content, { onClose: handleClose });
        break;
      case TOAST_TYPE.SUCCESS:
        toast.success(content, { onClose: handleClose });
        break;
      default:
        toast(content, { onClose: handleClose });
    }
  }, [type, content, handleClose]);

  return <ToastContainer position={position} autoClose={duration} draggable={false} hideProgressBar={true} />;
};

export const getIcon = (type?: string) => {
  let icon = 'fa-question';
  switch (type) {
    case TOAST_TYPE.ERROR:
      icon = 'fa-close';
      break;
    case TOAST_TYPE.SUCCESS:
      icon = 'fa-check';
      break;
  }
  return icon;
};
export const getTitle = (type?: string) => {
  let title = i18n.t('ATTENTION!');
  switch (type) {
    case TOAST_TYPE.ERROR:
      title = i18n.t('NOTIFICATION.ERROR!');
      break;
    case TOAST_TYPE.SUCCESS:
      title = i18n.t('NOTIFICATION.SUCCESS!');
      break;
    default:
      break;
  }
  return title;
};

export const getContentToast = (message: string, type?: TypeOptions) => ({
  closeToast
}: {
  closeToast: () => void;
}) => {
  return (
    <>
      <p style={{ fontSize: '15px' }}> {message}</p>
    </>
  );
};

export const notify = {
  error: (message: string, options?: ToastOptions) => {
    return toast.error(getContentToast(message, TOAST_TYPE.ERROR), {
      ...options,
      autoClose: 3600
    });
  },
  success: (message: string, options?: ToastOptions) => {
    return toast.success(getContentToast(message, TOAST_TYPE.SUCCESS), {
      ...options,
      autoClose: 3600
    });
  }
};

export default Toast;
