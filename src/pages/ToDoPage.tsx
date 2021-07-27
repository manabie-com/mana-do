import React from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import ToDoContainer from '../containers/Todo';
import { isAuthentication } from '../utils';


const ToDoPage = (props: RouteComponentProps<{}>) => {
    if (!isAuthentication()) {
        return <Redirect to='/' />
    }
    return (
        <ToDoContainer {...props} />
    );
};

export default ToDoPage;