import {SignInPage,ToDoPage} from "pages";
import {RouteComponentProps} from "react-router-dom";

type routeType = {
    key:string,
    path: string,
    isAuth?: boolean,
    comp:({history}:RouteComponentProps)=> JSX.Element
}

export const ROUTE_PATH = {
    SIGN_IN: "/sign-in",
    TODO: "/todo"
}

const routes:routeType[] = [
    {
        key:"signin",
        path: ROUTE_PATH.SIGN_IN,
        comp: SignInPage
    },
    {
        key:"signin",
        path: ROUTE_PATH.SIGN_IN,
        comp: ToDoPage,
        isAuth:true
    }
];

export default routes;