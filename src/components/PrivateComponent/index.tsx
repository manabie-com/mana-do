import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getItemLocalStorage } from "../../utils/localStorage.utils";

const PrivateComponent: React.FC<any> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        getItemLocalStorage("token", "") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateComponent;
