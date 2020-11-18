import { TodoStatus } from '../models/todo'

import Service, { MOCK_USER, MOCK_TOKEN } from './api-frontend'

describe('Service - api-frontend', () => {
  describe('signIn', () => {
    it('should return a token if log in with valid username & password', async done => {
      const { username, password } = MOCK_USER

      const token = await Service.signIn(username, password)
      expect(token).toBe(MOCK_TOKEN)
      done()
    })

    it('should throw an error if log in with an invalid username or password', async done => {
      let token, error

      try {
        token = await Service.signIn(MOCK_USER.username, 'wrong password')
      } catch (err) {
        error = err
      }
      expect(token).toBe(undefined)
      expect(error).toBe('Incorrect username/password')
      done()
    })
  })

  describe('verifyToken', () => {
    it('should return nothing after verified a token', async done => {
      const result = await Service.verifyToken(MOCK_TOKEN)

      expect(result).toBe(undefined)
      done()
    })

    it('should throw an error if the token is invalid', async done => {
      let error
      try {
        await Service.verifyToken('invalid_token')
      } catch (err) {
        error = err
      }
      expect(error).toBe('Invalid token')
      done()
    })
  })

  describe('createTodo', () => {
    it('should create a todo with the received content', async done => {
      const content = 'Content for todo'
      const toto = await Service.createTodo(content)

      expect(toto.content).toBe(content)
      expect(toto.status).toBe(TodoStatus.ACTIVE)
      expect(toto.user_id).toBe(MOCK_USER.username)
      done()
    })
  })

  describe('getTodos', () => {
    it('should return an empty list', async done => {
      const todos = await Service.getTodos()

      expect(todos.length).toBe(0)
      done()
    })
  })
})
