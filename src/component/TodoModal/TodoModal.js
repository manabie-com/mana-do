import React, {useState} from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

export default function TodoModal({show, setShow, onDeleteAlltodo}) {  
    const handleClose = () => {
      setShow(false);
    }
    const handleDelete = () => {
      setShow(false);
      onDeleteAlltodo();
    }
    return (
      <>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header>
            <Modal.Title>Delete all todos</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, Do you want to clear all the Todo?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }