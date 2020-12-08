import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; // modal for editing task
// define modal style
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root'); // set accessibily of Modal

const ModalEdit = (props: any) => {
  const modalIsOpen = props.modalIsOpen;
  const closeModal = props.closeModal;
  const task = props.task;
  const onUpdateTodo = props.onUpdateTodo;
  const [content, setContent] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.currentTarget.value);
  }

  useEffect(() => {
    setContent(task.content)
  }, [task])

  return (

    <div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>

          <div>
            <h3>Edit task</h3>
            <label>Task content:</label>
            <input
              className="Todo__input"
              value={content}
              onChange={handleChange}
            />
          </div>
        </div>
        <button onClick={closeModal}>Cancel</button>
        <button onClick={() => onUpdateTodo(task.id, content)}>Edit</button>

      </Modal>

    </div>
  );
}

export default ModalEdit;
