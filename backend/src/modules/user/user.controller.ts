import Router from '@koa/router';

import userService from './user.service';

const router = new Router({ prefix: '/users' });

router.get('/', async (ctx) => {
  const users = await userService.getUsers();
  ctx.body = { data: users };
});

export default router;
