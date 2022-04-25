import './styles.css';

import React from 'react';

import { useLanguageContext } from '../../hook/useLanguageContext';

interface IModal {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}
const Modal: React.FC<IModal> = (props) => {
  const { dataLanguage, selectLanguage } = useLanguageContext();
  const language = dataLanguage[selectLanguage];
  const className = props.isVisible
    ? "modal__box modal__box-display"
    : "modal__box";
  const handleOk = () => {
    props.onOk();
    handleCancel();
  };
  const handleCancel = () => {
    props.setIsVisible(false);
  };
  return (
    <div className={className}>
      <div className="modal-content">
        <span className="close" onClick={handleCancel}>
          &times;
        </span>
        <h3 className="modal-title">{language.modalTitle}</h3>
        <p className="modal-content-detail">{language.modalContent}</p>
        <div className="todo-delete-box">
          <button className="button-accept" onClick={handleOk}>
            {language.buttonAccept}
          </button>
          <button onClick={handleCancel}> {language.buttonCancel}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
