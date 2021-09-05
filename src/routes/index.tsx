import React from "react";
import { BrowserRouter } from "react-router-dom";
import LoginRoutes from "./LoginRoutes";
import TodoRoutes from "./TodoRoutes";

export default function Routes() {
  return (
    <BrowserRouter>
      <TodoRoutes />
      <LoginRoutes />
    </BrowserRouter>
  );
}
