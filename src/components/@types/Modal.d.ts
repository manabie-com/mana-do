interface IModal {
  isShow?: boolean | string;
  className?: string;
  setIsShow?: any;
  backgroundColorOverlay?: string;
  classNameContainer?: string;
}

interface IModalError extends IModal {
  message: string;
}
