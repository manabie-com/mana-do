import React, {ChangeEvent, Dispatch, FormEvent} from 'react';

interface Props {
    input: string;
    setInput: Dispatch<React.SetStateAction<string>>;
    onCreateTodo: () => void;
}

const TodoInputForm: React.FC<Props> = (props) => {
    const onCreateTodo = (e: FormEvent) => {
        e.preventDefault();
        props.onCreateTodo();
    };
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.setInput(e.target.value);
    };
    return (
        // FIXED: use form for a better UX, mobile support
        <form onSubmit={onCreateTodo} className="Todo__creation">
            <input
                value={props.input}
                onChange={onInputChange}
                className="Todo__input"
                placeholder="What need to be done?"
            />
        </form>
    );
}

export default TodoInputForm;
