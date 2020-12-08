import React from 'react';

const AddNewTaskForm = (props:any) => {
    const inputRef = props.inputRef;
    const onCreateTodo = props.onCreateTodo;

 return (
    <div className="Todo__creation">
    <input
        ref={inputRef}
        className="Todo__input"
        placeholder="What need to be done?"
        onKeyDown={onCreateTodo}
    />
</div>
 )
}

export default AddNewTaskForm