import React, { ComponentType } from 'react';
import {
    Redirect,
    Route,
    RouteProps,
} from "react-router-dom";
import userService from '../service/user.service';
import { ROUTE } from './constant';

interface IPrivateRoute extends RouteProps {
    component: ComponentType<any>
}

// Create the private router for authentication
const PrivateRoute = ({ component: Component, ...rest }: IPrivateRoute) => {
    const isLogged = userService.getToken();
    return (
        <Route
            {...rest}
            render={(props) => isLogged
                ? <Component {...props} />
                : <Redirect to={ROUTE.SIGN_IN_PAGE} />}
        />
    )
}

export default PrivateRoute;