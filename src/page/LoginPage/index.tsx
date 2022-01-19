import React, { useState } from "react"
import { useHistory } from 'react-router-dom'

import { Redirect } from "react-router-dom"

import Service from "../../service"
import StorageService from "../../service/StorageService"
import { STORAGE_TOKEN } from "../../utils/constant"

import type { ParamsLogin, ApiResponse } from '../../service/types'

const LoginPage = () => {

  const history = useHistory()

  const authStorageService = new StorageService(STORAGE_TOKEN, '')
  const token = authStorageService.get()

  const [formData, setFormValues] = useState<ParamsLogin>({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChangeValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setError('')
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    try {
      await Service.login(formData)
      history.push('/')
    } catch (error) {
      setError((error as ApiResponse).message)
    }
  }

  if (token) {
    return <Redirect to="/" />
  }

  return (
    <div className="LoginPage__container">
      {error && (
        <div className="Alert error" role="alert">
          {error}
        </div>
      )}
      <form className="LoginForm__container" onSubmit={handleSubmitLogin}>
        <div className="form-input">
          <label htmlFor="username">Username:</label>
          <input required name="username" id="username" onChange={handleChangeValues} />
        </div>
        <div className="form-input">
          <label htmlFor="password">Password:</label>
          <input type="password" required name="password" id="password" onChange={handleChangeValues} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export {LoginPage}