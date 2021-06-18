import React from "react";
import {Switch, Route} from 'react-router-dom'

import SignInPage from "../SignInPage";
import ToDoPage from "../ToDoPage";

export const PageRoutes = () => {
    return <Switch>
        <Route path="/" exact component={SignInPage}/>
        <Route path="/todo" component={ToDoPage}/>
    </Switch>
}