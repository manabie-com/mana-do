import React, { useState } from 'react'

import {useHistory} from 'react-router-dom'
import Service from '../../service'
import Button from '../../ui/button/Button'

import './SignInForm.css'



const SignInForm = () => {
  const [form, setForm] = useState({
    userId: '',
    password: ''
  })
  //Adding error handling for form
  const [error, setError] = useState<string>(' ')
  const history = useHistory()

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    Service.signIn(form.userId, form.password)
      .then(resp => {
        localStorage.setItem('token', resp)
        history.push('/todo')
      })
      .catch(error => {
        setError(error)
      })
  }

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.persist()
      setError('')
      setForm(prev=>({
          ...prev,
          [e.target.name]: e.target.value
      }))
  }

  return (
    <div className="formContainer">
      <h1>Mana Do Application</h1>
      <form onSubmit={signIn} data-testid="sign-in-form">
        <div className="formItem">
          <label htmlFor="user_id" className="formItemLabel">
            Username
          </label>
          <input
            id="user_id"
            data-testid="sign-in-input-userid"
            name="userId"
            required
            value={form.userId}
            onChange={onChangeField}
            placeholder="Type in your username"
          />
        </div>
        <div className="formItem">
          <label htmlFor="password" className="formItemLabel">
            Password
          </label>
          <input
            id="password"
            data-testid="sign-in-input-password"
            name="password"
            type="password"
            required
            value={form.password}
            onChange={onChangeField}
            placeholder="Type in your password"
          />
        </div>
        <div>
          <p className="formError">{error}</p>
        </div>
        <Button 
          className="formButton" 
          type="submit"
          dataTestId="sign-in-button"
        >
          Log In
        </Button>
      </form>
    </div>
  )
}


export default SignInForm