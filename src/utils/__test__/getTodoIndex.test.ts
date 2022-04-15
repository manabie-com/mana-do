import { fakeTodoList } from '../../test/liveState'
import getTodoIndex from '../getTodoIndex'

test('should return the correct index when there is an existing todo', () => {
  const items = fakeTodoList
  const itemId = items[1].id
  expect(getTodoIndex(items, itemId)).toBe(1)
})

test('should return -1 when there is no existing todo', () => {
  const items = fakeTodoList
  expect(getTodoIndex(items, 'test')).toBe(-1)
})
