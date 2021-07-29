import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import TodoComponent from 'root/components/todo'

const TodoPage = (props: RouteComponentProps) => {
    return (
        <TodoComponent {...props}/>
    );
};

export default TodoPage;