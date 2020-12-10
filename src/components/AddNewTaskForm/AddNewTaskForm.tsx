import React from 'react';

const AddNewTaskForm = (props: any) => {
    const inputRef = props.inputRef;
    const onCreateTodo = props.onCreateTodo;

    return (
        <div className="Todo__creation floating-label-group">
            <input
                ref={inputRef}
                className="Todo__input"
                onKeyDown={onCreateTodo}
                required
            />
            <label className="floating-label-1">What need to be done?</label>
        </div>
    )
}

export default AddNewTaskForm