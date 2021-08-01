import { lazy } from "react";
import { RoutePath } from "./paths";
import { withPrivatePage, withPublicPage } from "../hocs";

const PageLogin = lazy(() => import("../pages/login/Login"));
const PageTodo = lazy(() => import("../pages/todo/Todo"));

export const AppRoutes = {
  getRoutes: () => [
    {
      path: RoutePath.login,
      component: withPublicPage(PageLogin),
      isPrivate: false,
      exact: false
    },
    {
      path: RoutePath.todo,
      component: withPrivatePage(PageTodo),
      isPrivate: true,
      exact: true
    },
  ],
};
