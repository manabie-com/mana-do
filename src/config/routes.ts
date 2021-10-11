import SignInPage from "../components/Signin/SignInPage";
import Todo from "../components/Todo/TodoPage";
import IRoute from "../models/routes";

const routes: IRoute[] = [
  {
    path: "/",
    name: "Signin",
    component: SignInPage,
    exact: true,
  },
  {
    path: "/todo",
    name: "Todo",
    component: Todo,
    exact: false,
  },
];
export default routes;
