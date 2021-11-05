import React from 'react';
import { Route } from 'react-router-dom';


interface Props {
    exact: boolean;
    path: string;
    component: any;
}

const PublicRoute = ({ exact, path, component: Component }: Props) => {
    return (
        <Route
            exact={exact}
            path={path}
            render={(routeProps) => {
                localStorage.removeItem('token');
                return <Component {...routeProps} />;
            }}
        />

    )
}

export default PublicRoute
