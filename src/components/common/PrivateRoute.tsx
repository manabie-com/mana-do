import React from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';


interface Props {
    exact: boolean;
    path: string;
    component: any;
}

const PrivateRoute = ({ exact, path, component: Component }: Props) => {
    const history = useHistory()
    return (
        <Route
            exact={exact}
            path={path}
            render={(routeProps) => {
                const accessToken = localStorage.getItem('token');
                if (!accessToken) {
                    // <Redirect to={'/'} />
                    history.push('/')
                }
                return <Component {...routeProps} />;
            }}
        />

    )
}

export default PrivateRoute
