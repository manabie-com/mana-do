import SignInPage from "./pages/SignInPage";
import ToDoPage from "./pages/ToDoPage";
import About from "./pages/About";

interface Routes {
  path: string;
  name: string;
  exact: boolean;
  private: boolean;
  component: React.FC;
}

export const routes: Array<Routes> = [
  {
    path: "/",
    name: "Sign In",
    exact: true,
    private: false,
    component: SignInPage,
  },
  {
    path: "/todo",
    name: "ToDo List",
    exact: false,
    private: true,
    component: ToDoPage,
  },
  {
    path: "/about",
    name: "About",
    exact: false,
    private: false,
    component: About,
  },
];
