import React from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { Constants } from "./constants";

interface IProps extends RouteProps {
    component:
      | React.ComponentType<RouteComponentProps<any>>
      | React.ComponentType<any>;
  }

const PublicRoute = ({ component: Component, ...rest }: IProps) => {
    const token = localStorage.getItem(Constants.TOKEN);
  return (
    <Route
      {...rest}
      render={(props) =>
        token ?  <Redirect to="/todo" />  : <Component {...props} />
      }
    />
  );
}

export default PublicRoute;