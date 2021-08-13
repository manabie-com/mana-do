import { Switch } from "react-router-dom";
import { BlankLayout } from "../layouts";
import { SignInPage, ToDoPage } from "../pages";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";

export const Routers = () => {
  return (
    <Switch>
      <PublicRouter
        path="/login"
        exact
        component={SignInPage}
        layout={BlankLayout}
      />
      <PrivateRouter exact path="/" component={ToDoPage} layout={BlankLayout} />
    </Switch>
  );
};
