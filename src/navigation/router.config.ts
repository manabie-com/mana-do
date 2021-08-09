import LoadableComponent from '../components/Loadable'

export const layouts: any = {
  accountLayout: 'accountLayout',
  portalLayout: 'portalLayout',
}

export const layoutRouter: any = {
  accountLayout: LoadableComponent(() => import('../components/Layout/AccountLayout')),
  portalLayout: LoadableComponent(() => import('../components/Layout/PortalLayout')),
}

export const accountLayout: any = {
  accountLogin: {
    path: '/account/login',
    title: 'LogIn',
    layout: layouts.accountLayout,
    component: LoadableComponent(() => import('../scenes/account/SignInPage'))
  },
  exception: {
    path: '/exception',
    title: 'Exception',
    layout: layouts.accountLayout,
    component: LoadableComponent(() => import('../components/Layout/ExceptionScreen'))
  }
}

export const portalLayouts: any = {
  // Portal
  todoPage: {
    path: '/todo',
    title: 'Todo',
    layout: layouts.portalLayout,
    component: LoadableComponent(() => import('../scenes/todo/ToDoPage')),
    permission: '',
  }
}

export const routers: any = {
  ...accountLayout,
  ...portalLayouts
}
