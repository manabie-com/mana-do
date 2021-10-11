import styles from './../SignInPage.module.scss'
import React from 'react'
import { Form, Input, Button } from 'antd'
import { PropsForm } from '../../../models'
const Presenter: React.FC<PropsForm> = ({
  status,
  onFinishSignup,
  onFinish,
  form,
}) => {
  return status === 0 ? (
    <Form
      className={styles['signin__form']}
      layout="vertical"
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        label="Username"
        name="usernameSignin"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input style={{ width: '20rem' }} />
      </Form.Item>
      <Form.Item
        label="Password"
        name="passwordSignin"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password style={{ width: '20rem' }} />
      </Form.Item>
      <Form.Item className={styles['signin__form__btn-signin']}>
        <div className={styles['signin__form__btn-signin']}>
          <Button
            className={styles['signin__form__btn__child-signin']}
            type="primary"
            htmlType="submit"
          >
            Signin
          </Button>
        </div>
      </Form.Item>
    </Form>
  ) : (
    <Form
      className={styles['signin__form']}
      layout="vertical"
      form={form}
      onFinish={onFinishSignup}
    >
      <Form.Item
        label="Gmail"
        name="gmail"
        rules={[{ required: true, message: 'Please input your gmail!' }]}
      >
        <Input style={{ width: '20rem' }} />
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input style={{ width: '20rem' }} />
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input style={{ width: '20rem' }} />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password style={{ width: '20rem' }} />
      </Form.Item>
      <Form.Item
        label="Re-Password"
        name="repassword"
        rules={[{ required: true, message: 'Please input your re-password!' }]}
      >
        <Input.Password style={{ width: '20rem' }} />
      </Form.Item>
      <Form.Item className={styles['signin__form__btn-signin']}>
        <div className={styles['signin__form__btn-signin']}>
          <Button
            className={styles['signin__form__btn__child-signin']}
            type="primary"
            htmlType="submit"
          >
            Signin
          </Button>
        </div>
      </Form.Item>
    </Form>
  )
}
export default Presenter
