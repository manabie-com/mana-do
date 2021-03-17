import * as React from "react";
import { Route, RouteProps, useHistory } from "react-router";

export interface IConditionalRouteProps extends RouteProps {
  condition?: boolean | Function;
  to: string;
}

const ConditionalRoute: React.FunctionComponent<IConditionalRouteProps> = ({
  condition,
  to,
  ...props
}) => {
  const history = useHistory();

  React.useEffect(() => {
    if (!condition) {
      history.push("/");
    } else history.push(to);
  }, [condition, history, to]);

  return <Route {...props}>{props.children}</Route>;
};

export default ConditionalRoute;
