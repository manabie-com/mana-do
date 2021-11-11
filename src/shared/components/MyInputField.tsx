import React from 'react';
import './MyInputField.scss';
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    title?: string;
}

const MyInputField = (props: IProps) => {
    const { title, type, ...rest } = props;

    return (
        <div className='input-container' >
            {title && <span className='title'>{title}</span>}
            <input
                type={type}
                className='input-field'
                {...rest}
            />
        </div >
    );
}

export default MyInputField;