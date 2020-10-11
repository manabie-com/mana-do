import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignInPage from "src/pages/signin";
import ToDoPage from "src/pages/todo";
import Routes from "src/constants/routes";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={Routes.Home} exact component={SignInPage} />
        <Route path={Routes.Todo} component={ToDoPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
