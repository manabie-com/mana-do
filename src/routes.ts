import { lazy } from "react";

const SignInPage = lazy(() => import('./SignInPage'));
const ToDoPage = lazy(() => import('./ToDoPage'));

export const Routing = [
    {
        path: '/',
        component: SignInPage,
        exact: true,
        isPrivate: false,
    },
    {
        path: '/todo',
        component: ToDoPage,
        exact: false,
        isPrivate: true,
    },
]