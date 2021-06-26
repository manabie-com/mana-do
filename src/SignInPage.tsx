import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Input from 'src/components/Input'
import Button from 'src/components/Button'
import Service from './service'

const SignInPage = () => {
  const [form, setForm] = useState({
    userId: '',
    password: '',
  })
  const history = useHistory()

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const resp = await Service.signIn(form.userId, form.password)

    localStorage.setItem('token', resp)
    history.push('/todo')
  }

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div style={{ marginTop: '3rem', textAlign: 'left' }}>
      <form onSubmit={signIn}>
        <label htmlFor='user_id'>
          User id
          <Input
            id='user_id'
            name='userId'
            value={form.userId}
            style={{ marginTop: 4, marginBottom: 12 }}
            onChange={onChangeField}
          />
        </label>
        <br />
        <label htmlFor='password'>
          Password
          <Input
            id='password'
            name='password'
            type='password'
            style={{ marginTop: 4, marginBottom: 12 }}
            value={form.password}
            onChange={onChangeField}
          />
        </label>
        <br />
        <Button type='submit' style={{ marginTop: 12 }}>
          Sign in
        </Button>
      </form>
    </div>
  )
}

export default SignInPage
