import PageNotFound from '../pages/PageNotFound';
import SignInPage from '../pages/Sigin/SignInPage';
import ToDoPage from '../pages/ToDos/ToDoPage';

/**
 - This file will config routes so that we can easily manage and maintain.
*/

const ROUTE_SIGNIN = '/';
const ROUTE_TODO = '/todo';

export interface IRoutes {
  path?: string;
  component: any;
  exact: boolean;
  routes?: string;
}

export const routes: IRoutes[] = [
  {
    path: ROUTE_SIGNIN,
    component: SignInPage,
    exact: true,
  },
  {
    path: ROUTE_TODO,
    component: ToDoPage,
    exact: true,
  },
  {
    component: PageNotFound,
    exact: false,
  },
];

export { ROUTE_SIGNIN, ROUTE_TODO };
