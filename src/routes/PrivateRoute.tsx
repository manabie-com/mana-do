import React from 'react'
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ ...rest }) => {
    const token = localStorage.getItem('token');
    return (
        <>
            {(!token || token === '') ? <Redirect to="/" /> : <Route {...rest} />}
        </>
    )
}

export default PrivateRoute;
