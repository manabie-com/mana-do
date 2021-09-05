import React from "react";
import { HashRouter } from "react-router-dom";
import LoginRoutes from "./LoginRoutes";
import TodoRoutes from "./TodoRoutes";

export default function Routes() {
  return (
    <HashRouter>
      <TodoRoutes />
      <LoginRoutes />
    </HashRouter>
  );
}
