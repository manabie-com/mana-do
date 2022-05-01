import React, { useState } from 'react';
import { updateTodo } from '../store/actions';
import Service from '../service';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const EditTodoModal = ({ data, dispatch }: any) => {
    const [showModal, setShowModal] = useState(false);
    const toggle = () => setShowModal(!showModal);
    const [editData, setEditData] = useState(data);

    const save = async () => {
        const resp = await Service.updateTodo(editData);

        dispatch(updateTodo(resp));
    }

    return (
        <>
            <span onDoubleClick={toggle}>{data.content}</span>
            <Modal isOpen={showModal} toggle={toggle}>
                <ModalHeader>
                    <h4>Edit Todo</h4>
                </ModalHeader>
                <ModalBody>
                    <strong>Content</strong>
                    <input className='w-100 mt-2' defaultValue={data.content}
                        onChange={(e) => setEditData({ ...editData, content: e.target.value })} />
                </ModalBody>
                <ModalFooter>
                    <button className="Action__btn" onClick={save}>
                        Save
                    </button>
                    <button onClick={toggle}>Cancel</button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default EditTodoModal;