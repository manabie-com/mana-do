import React from "react";
import Button from "../Button";
import "./Card.css";

interface cardModal {
    closeModalHandler: () => void;
    deleteAllTodos: () => void;
}

const CardModal = (props: cardModal) => {

    const { closeModalHandler, deleteAllTodos } = props
    return (
        <div className="card__modal">
            <h5>Are you sure, you want to delete all todos?</h5>
            <div className="card__btn">
                <Button title="Cancel" onClick={closeModalHandler} />
                <Button title="Delete" onClick={deleteAllTodos} className="btn__delete" />
            </div>
        </div >
    );
};

export default CardModal;
