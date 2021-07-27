import LoginContainer from 'root/containers/SignInPage'
import TodoContainer from 'root/containers/ToDoPage'

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
    exact: false,
    component: TodoContainer
  }
]

export default appRoutes