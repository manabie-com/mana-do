import { Switch, Route } from "react-router-dom";
import { SignInPage, ToDoPage } from "../pages";

export const Routers = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignInPage} />
      <Route path="/todo" component={ToDoPage} />
    </Switch>
  );
};
