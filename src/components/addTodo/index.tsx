import React from 'react';

interface Props {
    inputRefProp: React.RefObject<HTMLInputElement>;
    onCreateTodo: Function;
}

function AddTodo(props: Props) {
    const { inputRefProp, onCreateTodo } = props;

    const onKeyDownHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (onCreateTodo == null) return false;

        onCreateTodo(e, inputRefProp);
    }

    return (
        <div className="Todo__creation">
            <input
                ref={inputRefProp}
                className="Todo__input"
                placeholder="What need to be done?"
                onKeyDown={onKeyDownHandle}
            />
        </div>
    );
}

export default AddTodo;