import React from 'react'
const LoginContainer = React.lazy(() => import('root/containers/SignInPage'))
const TodoContainer = React.lazy(() => import('root/containers/ToDoPage'))

export type IAppRoute = {
  key: string,
  path: string,
  lazyLoad: boolean,
  component: any, //React.FC,
  exact: boolean
}

const appRoutes = [
  {
    key: 'login',
    path: '/',
    lazyLoad: true,
    exact: true,
    component: LoginContainer
  },
  {
    key: 'todo',
    path: '/todo',
    lazyLoad: true,
    exact: false,
    component: TodoContainer
  }
]

export default appRoutes