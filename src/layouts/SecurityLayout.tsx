import React from "react";
import { Redirect } from "react-router-dom";
import { getToken } from "../utils/localStorage";

interface SecurityLayoutProps {
  children: any;
}

const SecurityLayout = ({ children }: SecurityLayoutProps) => {
  const token = getToken();
  if (!token) {
    return <Redirect to={`/`} />;
  }

  return children;
};

export default SecurityLayout;
