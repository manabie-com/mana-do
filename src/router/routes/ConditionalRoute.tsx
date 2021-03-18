import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router";

export interface IConditionalRouteProps extends RouteProps {
  condition?: boolean;
  redirect: string;
  reason?: string;
}

const ConditionalRoute: React.FunctionComponent<IConditionalRouteProps> = ({
  condition,
  reason,
  path,
  redirect,
  children,
  ...props
}) => {
  return (
    <Route
      {...props}
      render={() => (condition ? children : <Redirect to={redirect} />)}
    />
  );
};

export default ConditionalRoute;
