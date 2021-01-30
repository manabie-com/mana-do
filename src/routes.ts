import SignInPage from "./pages/SignInPage";
import ToDoPage from "./pages/ToDoPage";

interface Routes {
  path: string;
  exact: boolean;
  private: boolean;
  component: React.FC;
}

export const routes: Array<Routes> = [
  {
    path: "/",
    exact: true,
    private: false,
    component: SignInPage,
  },
  {
    path: "/todo",
    exact: true,
    private: true,
    component: ToDoPage,
  },
];
