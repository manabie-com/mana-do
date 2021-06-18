import React from "react";
import {Switch, Route} from 'react-router-dom'

import SignInPage from "../pages/SignInPage";
import ToDoPage from "../pages/ToDoPage";

export const PageRoutes = () => {
    return <Switch>
        <Route path="/" exact component={SignInPage}/>
        <Route path="/todo" component={ToDoPage}/>
    </Switch>
}