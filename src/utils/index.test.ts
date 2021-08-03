import { isTodoCompleted, isTodoActive } from './index';
import { TodoStatus } from '../models/todo';

const ACTIVE_TODO = {
  id: '1',
  user_id: 'crissang',
  content : 'Todo active',
  status: TodoStatus.ACTIVE,
  created_date: new Date().toISOString(),
};

const COMPLETED_TODO = {
  id: '2',
  user_id: 'crissang',
  content : 'Todo completed',
  status: TodoStatus.COMPLETED,
  created_date: new Date().toISOString(),
};

describe('isTodoCompleted', () => {
  test('isTodoCompleted with completed todo', () => {
    expect(isTodoCompleted(COMPLETED_TODO)).toBe(true);
  });

  test('isTodoCompleted with active todo', () => {
    expect(isTodoCompleted(ACTIVE_TODO)).toBe(false);
  });
});

describe('isTodoActive', () => {
  test('isTodoActive with active todo', () => {
    expect(isTodoActive(ACTIVE_TODO)).toBe(true);
  });

  test('isTodoActive with completed todo', () => {
    expect(isTodoActive(COMPLETED_TODO)).toBe(false);
  });
});
