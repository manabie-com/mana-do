
import React from 'react';
import { Switch, Route } from 'react-router';
import SignInPage from '../pages/SignInPage';
import ToDoPage from '../pages/TodoPage';
import { ROUTE } from './constant';
import PrivateRoute from './PrivatedRoute';

const AppNavigation = (props: any) => {
    return (
        <Switch>
            <Route path={ROUTE.SIGN_IN_PAGE} exact component={SignInPage} />
            <PrivateRoute path={ROUTE.TODO_PAGE} component={ToDoPage} />
        </Switch>
    )
}

export default AppNavigation;

