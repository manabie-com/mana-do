import React from 'react'
const LoginContainer = React.lazy(() => import('root/containers/SignInPage'))
const TodoContainer = React.lazy(() => import('root/containers/ToDoPage'))

export type IAppRoute = {
  key: string,
  path: string,
  component: any, //React.FC,
  exact: boolean
}

const appRoutes = [
  {
    key: 'login',
    path: '/',
    exact: true,
    component: LoginContainer
  },
  {
    key: 'todo',
    path: '/todo',
    exact: true,
    component: TodoContainer
  }
]

export default appRoutes