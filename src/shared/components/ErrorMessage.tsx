import React from 'react';
import './ErrorMessage.scss';

interface IProps extends React.HtmlHTMLAttributes<HTMLElement> {
    label: string;
}

const ErrorMessage = ({ label, ...rest }: IProps) => {
    return (
        <p className='error-message' {...rest}>{label}</p>
    )
}

export default ErrorMessage;