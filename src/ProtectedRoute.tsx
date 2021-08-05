import React from 'react'
import { RouteProps } from 'react-router';
import { Route, Redirect } from 'react-router-dom';

export type ProtectedRouteProps = {
    authenticationPath: string;
} & RouteProps;

export default function ProtectedRoute({ authenticationPath, ...routeProps }: ProtectedRouteProps) {
    let isAuthenticated = false

    if (localStorage.token) {
        isAuthenticated = true
    }

    if (isAuthenticated) {
        return <Route {...routeProps} />;
    } else {
        return <Redirect to={{ pathname: authenticationPath }} />;
    }
};