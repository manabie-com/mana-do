import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Service from '../../service'

import { useStorage } from '../../utils/hooks'

import TodoInput from '../../components/todo-input'

import styles from './sign-in.module.css'

const SignInPage = (): JSX.Element => {
  const [, setData] = useStorage('token')
  const [form, setForm] = useState({
    userId: '',
    password: ''
  })
  const history = useHistory()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.persist()

    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    try {
      const resp = await Service.signIn(form.userId, form.password)

      setData(resp)
      history.push('/todo')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div>
            <label htmlFor='user_id'>
              User ID
            </label>
          </div>
          <div>
            <TodoInput
              id='user_id'
              name='userId'
              value={form.userId}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div>
            <label htmlFor='password'>
              Password
            </label>
          </div>
          <div>
            <TodoInput
              id='password'
              name='password'
              type='password'
              value={form.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type='submit'>
          Sign in
        </button>
      </form>
    </div>
  )
}

export default SignInPage
