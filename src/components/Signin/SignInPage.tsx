import styles from './SignInPage.module.scss'
import { BrowserRouter as Router, useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Form, notification } from 'antd'
import accountAPI from '../../service/auth'
import { Account, PropsFormSignin, Signin } from '../../models'
import { accessToken, loading } from '../../redux/Actions'
import Presenter from './Presenter'
const openNotification = (status: string, content: string) => {
  if (status === 'success') {
    notification.success({
      duration: 3,
      message: 'Success',
      description: content,
    })
  } else {
    notification.error({
      duration: 3,
      message: 'Error',
      description: content,
    })
  }
}
function validateEmail(email: string) {
  const re = /^[a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-z0-9]@[a-z0-9][-\.]{0,1}([a-z][-\.]{0,1})*[a-z0-9]\.[a-z0-9]{1,}([\.\-]{0,1}[a-z]){0,}[a-z0-9]{0,}$/
  return re.test(String(email).toLowerCase())
}
const SignInPage: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [account, setAccount] = useState<Account[]>()
  const [status, setStatus] = useState<number>(0)
  const signinFunc = (object: Signin): void => {
    // Instead of now calling the login api, if the login is successful,
    // the server will respon the accessToken and save the accessToken to localStorage and pass
    // it to redux to save, every time a certain api call will check the accessToken
    // in the interceptors.request function. api, if it expires, call api refresherToken to get a new token,
    // if it fails, the server will respond with an error, but since there is no BE,
    // I will build a virtual mockAPI server, and getAllAccount to return,
    // run a for loop to check the account exists or not, if it exists,
    // I will create a virtual accessToken and save it to localStorage to check login
    //-> I know when getAllAccount like that, in the Network tab (f12) on the browser will see all accounts.
    let flag = 0
    if (account && account.length > 0) {
      let user_id: string = ''
      account.forEach((values) => {
        if (values.username === object.username) {
          if (values.password === object.password) {
            flag = 1
            if (values && values.id && values.id !== '') {
              user_id = values.id
            }
          }
        }
      })
      // flag === 1 -> exists account, flag === 0  wrong username or wrong password
      if (flag === 1) {
        openNotification('success', 'Signin successful')
        history.push('/todo')
        // Instead of getting the access Token from the server response,
        // save it to localStorage and save it to redux, I create an accessToken myself
        // accessToken consists of 3 parts: header, payload, signature, each part is separated by 1 dot
        localStorage.setItem(
          'accessToken',
          'dashdasdjk.ahasjkdhjkasds.aewqeqwejkeqwew',
        )
        localStorage.setItem('user_id', user_id)
        form.resetFields()
        dispatch(accessToken('dashdasdjk.ahasjkdhjkasds.aewqeqwejkeqwew'))
      } else {
        openNotification('error', 'Username or password is not correct')
      }
    }
  }
  const getAllAccount = async () => {
    try {
      dispatch(loading(true))
      const res = await accountAPI.getAll()
      // check status api
      if (res && res.status && res.status === 200) {
        setAccount(res.data)
      }
      dispatch(loading(false))
    } catch (error) {
      dispatch(loading(false))
    }
  }
  useEffect(() => {
    getAllAccount()
  }, [])
  const onFinish = (values: PropsFormSignin): void => {
    // check data
    if (values.usernameSignin !== '' && values.passwordSignin !== '') {
      signinFunc({
        username: values.usernameSignin,
        password: values.passwordSignin,
      })
    }
  }
  const signupFunc = async (data: Account) => {
    try {
      dispatch(loading(true))
      const res = await accountAPI.createAccount({ ...data })
      // check status api
      if (
        (res && res.status && res.status === 200) ||
        (res.status && res && res.status === 201)
      ) {
        //change status === 0, go back to signin
        setStatus(0)
        form.resetFields()
        await getAllAccount()
      }
      openNotification(
        'success',
        `Account: ${data.username} created successfully.`,
      )
      dispatch(loading(false))
    } catch (error) {
      dispatch(loading(false))
    }
  }
  const onFinishSignup = (values: Account) => {
    // check data
    if (
      values.username !== '' &&
      values.password !== '' &&
      values.name !== '' &&
      values.gmail !== ''
    ) {
      // flag === 1 -> username + gmail not exists, flagUsername === 1 exists username, flagGmail === 1 exists gmail
      let flag = 0
      let flagUsername = 0
      let flagGmail = 0
      // check user exist before create
      account &&
        account.length > 0 &&
        account.forEach((values2) => {
          if (values2.username !== values.username) {
            if (values2.gmail !== values.gmail) {
              flag = 1
            } else {
              flagGmail = 1
            }
          } else {
            flagUsername = 1
          }
        })
      if (flagUsername === 0 && flagGmail === 0) {
        if (flag === 1) {
          if (!validateEmail(values.gmail)) {
            openNotification('error', 'Gmail is malformed')
          } else {
            if (values.password === values.repassword) {
              signupFunc({
                username: values.username,
                password: values.password,
                gmail: values.gmail,
                name: values.name,
              })
            } else {
              openNotification('error', 'Passwords are not the same')
            }
          }
        }
      } else {
        if (flagUsername === 1) {
          openNotification('error', 'Username already exists.')
        }
        if (flagGmail === 1) {
          openNotification('error', 'Gmail already exists')
        }
      }
    }
  }
  const handleSign = (data: number): void => {
    setStatus(data)
  }
  return (
    <div className={styles['signin']}>
      <div className={styles['signin-choose']}>
        {status === 0 ? (
          <div style={{ color: 'blue' }} onClick={() => handleSign(0)}>
            Signin
          </div>
        ) : (
          <div onClick={() => handleSign(0)}>Signin</div>
        )}
        {status === 1 ? (
          <div style={{ color: 'blue' }} onClick={() => handleSign(1)}>
            Signup
          </div>
        ) : (
          <div onClick={() => handleSign(1)}>Signup</div>
        )}
      </div>
      {/* status === 0: signin, !== 0: signup */}
      <Presenter
        onFinishSignup={onFinishSignup}
        onFinish={onFinish}
        form={form}
        status={status}
      />
    </div>
  )
}
export default SignInPage
