import shortid from 'shortid';
import { TodoStatus } from '../models/todo';
import { isTodoCompleted, isTodoActive } from './index';

describe('isTodoCompleted', () => {
  it('should not completed todo ', () => {
    const todo = {
      content: 'have dinner',
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: 'firstUser',
    };

    const result = isTodoCompleted(todo);
    expect(result).toEqual(false);
  });

  it('should completed todo ', () => {
    const todo = {
      content: 'have dinner',
      created_date: new Date().toISOString(),
      status: TodoStatus.COMPLETED,
      id: shortid(),
      user_id: 'firstUser',
    };

    const result = isTodoCompleted(todo);
    expect(result).toEqual(true);
  });
});

describe('isTodoActive', () => {
  it('should not active todo ', () => {
    const todo = {
      content: 'have dinner',
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: 'firstUser',
    };

    const result = isTodoActive(todo);
    expect(result).toEqual(true);
  });

  it('should active todo ', () => {
    const todo = {
      content: 'have dinner',
      created_date: new Date().toISOString(),
      status: TodoStatus.COMPLETED,
      id: shortid(),
      user_id: 'firstUser',
    };

    const result = isTodoActive(todo);
    expect(result).toEqual(false);
  });
});
