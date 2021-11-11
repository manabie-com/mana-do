import React from 'react';
import './MyButton.scss';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
}

const MyButton = (props: IButton) => {
    const { label, ...rest } = props;

    return (
        <button
            className='my-button'
            {...rest}
        >
            {label}
        </button>
    )
}

export default MyButton;