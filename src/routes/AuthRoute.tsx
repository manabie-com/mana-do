import React from 'react'
import { Redirect } from 'react-router-dom';

type Props = {
    to: string,
}

const AuthRoute = ({ to }: Props) => {
    const token = localStorage.getItem('token');
    return (
        <>
            {(token || token !== '') && <Redirect to={to} />}
        </>
    )
}

export default AuthRoute;
