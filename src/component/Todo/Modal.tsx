import * as React from "react";
import Input from "component/Todo/InputWithErrorCheck";

interface ModalProps {
  toggleModal: () => void;
  onEditSubmit: (todoId: string, content: string) => void;
  id: string;
  content: string;
}

const Modal = ({ toggleModal, id, content, onEditSubmit }: ModalProps) => {
  const onSubmit = (updatedTodoValue: string) => {
    onEditSubmit(id, updatedTodoValue);
    toggleModal();
  };

  return (
    <>
      <div
        data-testid="modal-overlay"
        className="modal__container"
        onClick={toggleModal}
      >
        <div
          data-testid="modal"
          className="modal"
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="modal__heading">Editing Todos</h1>
          <Input updatedTodoValue={content} onSubmit={onSubmit} />
        </div>
      </div>
    </>
  );
};

export default Modal;
