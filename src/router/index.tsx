import loadable from '@loadable/component';


// Lazy loading component, React.lazy not support SSR.
const Home = loadable(() => import('../pages/signin'));
const Todo = loadable(() => import('../pages/todo'));

export { Home, Todo };