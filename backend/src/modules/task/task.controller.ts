import Router from '@koa/router';

import taskService from './task.service';

const router = new Router({ prefix: '/tasks' });

router.get('/', async (ctx) => {
  const { userId } = ctx.request.query;
  const tasks = await taskService.getTasks({ userId });
  ctx.body = { data: tasks };
});

router.post('/', async (ctx) => {
  const { userId, content } = ctx.request.body;
  const createdTask = await taskService.createTask({ userId, content });
  ctx.body = { data: createdTask };
});

router.put('/:id', async (ctx) => {
  const { id } = ctx.request.params;
  const { status } = ctx.request.body;
  const updatedTask = await taskService.updateTask({ id, status });
  ctx.body = { data: updatedTask };
});

router.delete('/:id', async (ctx) => {
  const { id } = ctx.request.params;
  const deletedTask = await taskService.deleteTask(id);
  ctx.body = { data: deletedTask };
});

router.delete('/', async (ctx) => {
  const { userId } = ctx.request.query;
  const deletedTasks = await taskService.deleteTasks({ userId });
  ctx.body = { data: deletedTasks };
});

export default router;
