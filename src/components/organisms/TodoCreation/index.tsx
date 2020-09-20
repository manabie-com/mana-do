import React from 'react';
import { Input } from 'components/atoms';

type Props = {
    onCreateTodo: (e: React.KeyboardEvent<HTMLInputElement>) => Promise<void>;
    forwardedRef?: React.RefObject<HTMLInputElement>;
}

const TodoCreation = ({ onCreateTodo,  forwardedRef }:Props) => {
    return (
        <div className="row">
            <div className="col-12">
                <Input
                    forwardedRef={forwardedRef} 
                    className="w-100 my-2"
                    placeholder="What need to be done?"
                    onKeyDown={onCreateTodo}
                />
            </div>
        </div>
    );
};

export default TodoCreation;