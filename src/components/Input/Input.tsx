import React from 'react';

import './style.css';

type InputProps = {
    value: string | number;
    handleChange: React.FormEventHandler<HTMLInputElement>;
    name: string;
    id: string;
    label: string;
};

const InputComponent = (props: InputProps): JSX.Element => {
    const {
        id,
        value,
        name,
        label,
        handleChange,
    } = props;
    return <div className="input-component">
        <label htmlFor={id}>
            <div className='input-component__text'>{ label }</div>
            <div className="input-component__input">
                <input
                    id={id}
                    name={name}
                    value={value}
                    onChange={handleChange}
                />
            </div>
        </label>
    </div>
};

export default InputComponent;
