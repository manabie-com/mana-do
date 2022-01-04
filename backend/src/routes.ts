import combineRouters from 'koa-combine-routers';

import taskRouter from './modules/task/task.controller';
import userRouter from './modules/user/user.controller';

const router = combineRouters(userRouter, taskRouter);

export default router;
